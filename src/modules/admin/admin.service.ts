import { db } from "../../db";
import { admins } from "../../db/schema/admins";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doctors } from "../../db/schema/doctors";
import { sql } from "drizzle-orm";
import { adminSessions }from "../../db/schema/adminSessions";
import { subscriptions } from "../../db/schema/subscriptions";
import { subscriptionPlans } from "../../db/schema/subscription-plans";

import { v4 as uuidv4 }
from "uuid";

export class AdminService {

 static async login(data: any) {

    console.log("LOGIN DATA =", data);

    try {

        console.log("STEP 1");

        const admin = await db
            .select()
            .from(admins)
            .where(eq(admins.email, data.email));

        console.log("STEP 2");
        console.log("ADMIN =", admin);

        if (admin.length === 0) {
            return {
                success: false,
                message: "Admin not found",
            };
        }

        console.log("STEP 3");

        const valid = await bcrypt.compare(
            data.password,
            admin[0].password
        );

        console.log("STEP 4");
        console.log("PASSWORD MATCH =", valid);

        if (!valid) {
            return {
                success: false,
                message: "Invalid credentials",
            };
        }

        console.log("STEP 5");

        const token = jwt.sign(
            {
                id: admin[0].id,
                role: "admin",
            },
            "SECRET_KEY",
            {
                expiresIn: "7d",
            }
        );

        console.log("STEP 6");

        const sessionId = uuidv4();

        await db.insert(adminSessions).values({
            adminId: admin[0].id,
            sessionId,
            token,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
        });

        console.log("STEP 7");

        return {
            success: true,
            id: admin[0].id,
            email: admin[0].email,
            role: admin[0].role,
            sessionId,
            token,
        };

    } catch (error) {

        console.log("LOGIN ERROR =", error);

        throw error;
    }
}

   static async getDoctors() {

    return await db
        .select({
            id: doctors.id,
            fullName: doctors.fullName,
            emailAddress: doctors.emailAddress,
            phone: doctors.phone,
        })
        .from(doctors);
}

static async logout(
    sessionId: string
) {

    await db
        .delete(
            adminSessions
        )
        .where(
            eq(
                adminSessions.sessionId,
                sessionId
            )
        );
}

static async getDoctorById(
    id: number
) {

    const doctor = await db
        .select()
        .from(doctors)
        .where(
            eq(
                doctors.id,
                id
            )
        );

    return doctor[0] || null;
}
static async deleteDoctor(
    id: number
) {

    await db
        .delete(doctors)
        .where(
            eq(
                doctors.id,
                id
            )
        );

    return true;
}

static async updateDoctor(
    id: number,
    data: any
) {

    await db
        .update(doctors)
        .set({
            fullName: data.fullName,
            emailAddress: data.emailAddress,
            phone: data.phone,
            designation: data.designation,
            speciality: data.speciality,
            regNo: data.regNo,
            primaryHospital: data.primaryHospital,
            hospitalId: data.hospitalId,
            dob: data.dob,
        })
        .where(
            eq(
                doctors.id,
                id
            )
        );

    const doctor = await db
        .select()
        .from(doctors)
        .where(
            eq(
                doctors.id,
                id
            )
        );

    return doctor[0];
}
static async getAllSubscriptions() {

    const data = await db
        .select({
            subscriptionId: subscriptions.id,

            doctorId: subscriptions.doctorId,

            doctorName: doctors.fullName,

            planId: subscriptions.planId,

            planName: subscriptionPlans.name,

            amount: subscriptions.amount,

            paymentStatus:
                subscriptions.paymentStatus,

            startDate:
                subscriptions.startDate,

            expiryDate:
                subscriptions.expiryDate,
        })
        .from(subscriptions)

        .leftJoin(
            doctors,
            eq(
                subscriptions.doctorId,
                doctors.id
            )
        )

        .leftJoin(
            subscriptionPlans,
            eq(
                subscriptions.planId,
                subscriptionPlans.id
            )
        );

    return data;
}
static async getDoctorSubscription(
    doctorId: number
) {

    const data = await db
        .select({
            subscriptionId:
                subscriptions.id,

            doctorName:
                doctors.fullName,

            planName:
                subscriptionPlans.name,

            amount:
                subscriptions.amount,

            paymentStatus:
                subscriptions.paymentStatus,

            startDate:
                subscriptions.startDate,

            expiryDate:
                subscriptions.expiryDate,
        })
        .from(subscriptions)

        .leftJoin(
            doctors,
            eq(
                subscriptions.doctorId,
                doctors.id
            )
        )

        .leftJoin(
            subscriptionPlans,
            eq(
                subscriptions.planId,
                subscriptionPlans.id
            )
        )

        .where(
            eq(
                subscriptions.doctorId,
                doctorId
            )
        );

    return data;
}
static async getPlans() {

    return await db
        .select()
        .from(subscriptionPlans);
}

static async createPlan(
    body: any
) {

    console.log(
        "SERVICE BODY =",
        body
    );

    if (!body) {
        throw new Error(
            "Body is missing"
        );
    }

    const result = await db
        .insert(subscriptionPlans)
        .values({
            name: String(body.name),

            durationDays: Number(
                body.durationDays
            ),

            amount: Number(
                body.amount
            ),
        });

    return {
        id: Number(
            result[0].insertId
        ),

        name: body.name,

        durationDays:
            Number(
                body.durationDays
            ),

        amount:
            Number(
                body.amount
            ),
    };
}

static async updatePlan(
    id: number,
    body: any
) {

    await db
        .update(
            subscriptionPlans
        )
        .set({
            name: body.name,

            durationDays:
                Number(
                    body.durationDays
                ),

            amount:
                Number(
                    body.amount
                ),
        })
        .where(
            eq(
                subscriptionPlans.id,
                id
            )
        );

    return {
        id,
        name: body.name,
        durationDays: Number(
            body.durationDays
        ),
        amount: Number(
            body.amount
        ),
    };
}

static async deletePlan(
    id: number
) {

    await db
        .delete(
            subscriptionPlans
        )
        .where(
            eq(
                subscriptionPlans.id,
                id
            )
        );

    return true;
}
}