import { db } from "../../db";
import { doctors } from "../../db/schema/doctors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { subscriptions } from "../../db/schema/subscriptions";
import { subscriptionPlans } from "../../db/schema/subscription-plans";
import { sessions } from "../../db/schema/sessions";
import { v4 as uuid } from "uuid";
import {uploadToS3,getSignedFileUrl,} from "../../utils/s3Upload";
import { doctorSubscriptions } from "../../db/schema/doctor-subscriptions";
import { eq, and, ne, desc } from "drizzle-orm";

export class DoctorService {

  static async register(data: any) {
    try{
      
  const existing = await db
    .select()
    .from(doctors)
    .where(eq(doctors.emailAddress, data.emailAddress));

  if (existing.length > 0) {
    return {
      success: false,
      message: "Doctor already exists",
    };
  }

  const phoneExists = await db
    .select()
    .from(doctors)
    .where(eq(doctors.phone, data.phone));

if (phoneExists.length > 0) {
    return {
        success: false,
        message: "Phone number already exists",
    };
}

const regNoExists = await db
    .select()
    .from(doctors)
    .where(eq(doctors.regNo, data.regNo));

if (regNoExists.length > 0) {
    return {
        success: false,
        message: "Registration number already exists",
    };
}
if (!/^[0-9]{10}$/.test(data.phone)) {
    return {
        success: false,
        message: "Phone number must be 10 digits",
    };
}
if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAddress)
) {
    return {
        success: false,
        message: "Invalid email address",
    };
}
if (!data.regNo?.trim()) {
    return {
        success: false,
        message: "Registration number is required",
    };
}
if (!data.fullName?.trim()) {
    return {
        success: false,
        message: "Full name is required",
    };
}
if (!data.password?.trim()) {
    return {
        success: false,
        message: "Password is required",
    };
}

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await db.insert(doctors).values({
    roleId: 2,
    password: hashedPassword,
    phone: data.phone,
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    designation: data.designation,
    speciality: data.speciality,
    regNo: data.regNo,
    primaryHospital: data.primaryHospital,
    createdAt: new Date().toISOString(),
  });

  const doctorId = result[0].insertId;

  return {
    success: true,
    id: doctorId,
    fullName: data.fullName,
    emailAddress: data.emailAddress,
  };
} catch(error:any){

        console.error("REGISTER SERVICE ERROR =", error);

        throw error;

    }

}

 static async login(data: any) {

  try{ 
  const doctor = await db
    .select()
    .from(doctors)
    .where(eq(doctors.emailAddress, data.emailAddress));

  if (doctor.length === 0) {
    return {
      success: false,
      message: "Doctor not found",
    };
  }

  const valid = await bcrypt.compare(
    data.password,
    doctor[0].password
  );

  if (!valid) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  const token = jwt.sign(
    {
      id: doctor[0].id,
      role: "doctor",
    },
    "SECRET_KEY",
    { expiresIn: "7d" }
  );

  const sessionId = uuid();

await db.insert(sessions).values({
    doctorId: doctor[0].id,
    sessionId,
    token, // Save JWT
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});
// ==========================
// FETCH ACTIVE SUBSCRIPTION
// ==========================

const subscription = await db
  .select()
  .from(doctorSubscriptions)
  .where(eq(doctorSubscriptions.doctorId, doctor[0].id))
  .orderBy(desc(doctorSubscriptions.id))
  .limit(1);

let subscriptionData = null;

if (subscription.length > 0) {

  const planData = await db
    .select({
      planName: subscriptions.planName,
      operationalRecordLimit: subscriptions.operationalRecordLimit,
      templateLimit: subscriptions.templateLimit,
      storageLimit: subscriptions.storageLimit,

      amount: subscriptionPlans.amount,
      frequency: subscriptionPlans.frequency,
    })
    .from(subscriptionPlans)
    .innerJoin(
      subscriptions,
      eq(subscriptionPlans.subscriptionId, subscriptions.id)
    )
    .where(eq(subscriptionPlans.id, subscription[0].planId))
    .limit(1);

  subscriptionData = {

    planId: subscription[0].planId,

    plan: planData.length
      ? planData[0].planName
      : null,

    amount: planData.length
      ? planData[0].amount
      : null,

    frequency: planData.length
      ? planData[0].frequency
      : null,

    operationalRecordLimit: planData.length
      ? planData[0].operationalRecordLimit
      : null,

    templateLimit: planData.length
      ? planData[0].templateLimit
      : null,

    storageLimit: planData.length
      ? planData[0].storageLimit
      : null,

    paymentStatus: subscription[0].paymentStatus,

    startDate: subscription[0].startDate,

    expiryDate: subscription[0].expiryDate,
  };

}


  return {
    success: true,
    id: doctor[0].id,
    fullName: doctor[0].fullName,
    emailAddress: doctor[0].emailAddress,
    sessionId,
    token,
    subscription: subscriptionData,
};
 }catch(error:any){

        console.error("LOGIN SERVICE ERROR =", error);

        throw error;

    }

}

  static async getAll() {
  const data = await db.select().from(doctors);

  return data;
}

static async getById(id: number) {
  try{
  const doctor = await db
    .select()
    .from(doctors)
    .where(eq(doctors.id, id));

  if (doctor.length === 0) {
    return {
      success: false,
      message: "Doctor not found",
    };
  }

  return {
    success: true,
    data: doctor[0],
  };
} catch(error:any){

        console.error("DOCTOR SERVICE ERROR =", error);

        throw error;

    }

}


static async logout(sessionId: string) {

  try{

    const session = await db.query.sessions.findFirst({
        where: eq(sessions.sessionId, sessionId),
    });

    if (!session) {
        return {
            success: false,
            message: "Session not found",
        };
    }

    await db
        .delete(sessions)
        .where(eq(sessions.sessionId, sessionId));

    return {
        success: true,
    };
 }catch(error:any){

        console.error("logout SERVICE ERROR =", error);

        throw error;

    }

}


static async getProfile(doctorId: number) {
  try{

    const doctor = await db
        .select()
        .from(doctors)
        .where(eq(doctors.id, doctorId));

    if (doctor.length === 0) {
        throw new Error("Doctor not found");
    }

    const doctorData = doctor[0];

if (doctorData.profileImage) {
    doctorData.profileImage = await getSignedFileUrl(
        doctorData.profileImage
    );
}

return doctorData;
 }catch(error:any){

        console.error("GET PROFILE SERVICE ERROR =", error);

        throw error;

    }

}



static async updateProfile(
    doctorId: number,
    body: any
) {
  try{

    const doctor = await db.query.doctors.findFirst({
        where: eq(doctors.id, doctorId),
    });
    if (!doctor) {
        throw new Error("Doctor not found");
    }

    const existingEmail = await db
    .select()
    .from(doctors)
    .where(
        and(
            eq(doctors.emailAddress, body.emailAddress),
            ne(doctors.id, doctorId)
        )
    );
    if (existingEmail.length > 0) {
    throw new Error("Email already exists");
}

    // Check duplicate phone
const existingPhone = await db
    .select()
    .from(doctors)
    .where(
        and(
            eq(doctors.phone, body.phone),
            ne(doctors.id, doctorId)
        )
    );

if (existingPhone.length > 0) {
    throw new Error("Phone number already exists");
}

const existingRegNo = await db
    .select()
    .from(doctors)
    .where(
        and(
            eq(doctors.regNo, body.regNo),
            ne(doctors.id, doctorId)
        )
    );

if (existingRegNo.length > 0) {
    throw new Error("Registration number already exists");
}

    

    let profileImage = doctor.profileImage;

if (body.profileImage) {
    const uploaded = await uploadToS3(
        body.profileImage,
        "profile",
        doctor.fullName
    );

    profileImage = uploaded.key;
}

    await db .update(doctors) .set({ fullName: body.fullName, phone: body.phone, emailAddress: body.emailAddress, designation: body.designation, speciality: body.speciality, regNo: body.regNo, primaryHospital: body.primaryHospital, dob: body.dob, profileImage: profileImage, updatedAt: new Date().toISOString() }) .where(eq(doctors.id, doctorId));

const [updatedDoctor] = await db
.select()
.from(doctors)
.where(eq(doctors.id, doctorId));

if (updatedDoctor.profileImage) {

    updatedDoctor.profileImage =
        await getSignedFileUrl(
            updatedDoctor.profileImage
        );

}

return updatedDoctor;
 }catch(error:any){

        console.error("UPDATE PROFILE SERVICE ERROR =", error);

        throw error;

    }

}

}