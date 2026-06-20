import { db } from "../../db";
import { admins } from "../../db/schema/admins";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doctors } from "../../db/schema/doctors";
import { hospitals } from "../../db/schema/hospitals";
import { subscriptions } from "../../db/schema/subscriptions";
import { sql } from "drizzle-orm";

export class AdminService {

    static async login(data: any) {

        const admin = await db
            .select()
            .from(admins)
            .where(eq(admins.email, data.email));

        if (admin.length === 0) {
            throw new Error("Admin not found");
        }

        const valid = await bcrypt.compare(
            data.password,
            admin[0].password
        );

        if (!valid) {
            throw new Error("Invalid credentials");
        }

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

        return {
            token,
            admin: {
                id: admin[0].id,
                email: admin[0].email,
            },
        };
    }

    static async getDoctors() {

    return await db
        .select({
            id: doctors.id,
            name: doctors.name,
            email: doctors.email,
            phone: doctors.phone,
            hospitalId: doctors.hospitalId,
        })
        .from(doctors);
}

static async getHospitals() {

    return await db
        .select({
            id: hospitals.id,
            name: hospitals.name,
            email: hospitals.email,
        })
        .from(hospitals);
}

static async getSubscriptions() {

    return await db
        .select()
        .from(subscriptions);
}

static async getDashboard() {

    const doctorCount = await db
        .select({
            total: sql<number>`COUNT(*)`,
        })
        .from(doctors);

    const hospitalCount = await db
        .select({
            total: sql<number>`COUNT(*)`,
        })
        .from(hospitals);

    const subscriptionCount = await db
        .select({
            total: sql<number>`COUNT(*)`,
        })
        .from(subscriptions);

    return {
        totalDoctors: doctorCount[0].total,
        totalHospitals: hospitalCount[0].total,
        totalSubscriptions: subscriptionCount[0].total,
    };
}
}