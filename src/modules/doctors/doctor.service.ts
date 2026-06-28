import { db } from "../../db";
import { doctors } from "../../db/schema/doctors";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { subscriptions } from "../../db/schema/subscriptions";
import { subscriptionPlans } from "../../db/schema/subscription-plans";
import { sessions } from "../../db/schema/sessions";
import { v4 as uuid } from "uuid";

export class DoctorService {

  static async register(data: any) {
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

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await db.insert(doctors).values({
    password: hashedPassword,
    phone: data.phone,
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    designation: data.designation,
    speciality: data.speciality,
    regNo: data.regNo,
    primaryHospital: data.primaryHospital,
  });

  const doctorId = result[0].insertId;

  // Fetch FREE plan
const freePlan = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.name, "FREE"));

if (!freePlan.length) {
    throw new Error("FREE subscription plan not found.");
}

// Create FREE subscription
await db.insert(subscriptions).values({
    doctorId: doctorId,
    planId: freePlan[0].id,
    amount: freePlan[0].amount,
    paymentStatus: "SUCCESS",
    startDate: new Date(),
    expiryDate: new Date(
        Date.now() +
        Number(freePlan[0].durationDays) * 24 * 60 * 60 * 1000
    ),
});

  return {
    success: true,
    id: doctorId,
    fullName: data.fullName,
    emailAddress: data.emailAddress,
  };
}
 static async login(data: any) {
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
  // ✅ FETCH SUBSCRIPTION
const subscription = await db
  .select()
  .from(subscriptions)
  .where(eq(subscriptions.doctorId, doctor[0].id));

let subscriptionData = null;

if (subscription.length > 0) {
  const planData = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.id, subscription[0].planId));

  subscriptionData = {
    planId: subscription[0].planId,
    plan: planData.length ? planData[0].name : null,
    amount: planData.length ? planData[0].amount : null,
    durationDays: planData.length ? planData[0].durationDays : null,
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
}

  static async getAll() {
  const data = await db.select().from(doctors);

  return data;
}

static async getById(id: number) {
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
}


static async logout(sessionId: string) {

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
}


static async getProfile(doctorId: number) {

    const doctor = await db
        .select()
        .from(doctors)
        .where(eq(doctors.id, doctorId));

    if (doctor.length === 0) {
        throw new Error("Doctor not found");
    }

    return doctor[0];
}



static async updateProfile(
    doctorId: number,
    body: any
) {

    const doctor = await db.query.doctors.findFirst({
        where: eq(doctors.id, doctorId),
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    await db .update(doctors) .set({ fullName: body.fullName, phone: body.phone, emailAddress: body.emailAddress, designation: body.designation, speciality: body.speciality, regNo: body.regNo, primaryHospital: body.primaryHospital, dob: body.dob, updatedAt: new Date().toISOString() }) .where(eq(doctors.id, doctorId));

const [updatedDoctor] = await db
    .select()
    .from(doctors)
    .where(eq(doctors.id, doctorId));

return updatedDoctor;
}

}