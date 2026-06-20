import { db } from "../../db";
import { hospitals } from "../../db/schema/hospitals";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doctors } from "../../db/schema/doctors";


export class HospitalService {
    // =========================
    // REGISTER HOSPITAL
    // =========================
    static async register(data: any) {
        const existing = await db
            .select()
            .from(hospitals)
            .where(eq(hospitals.email, data.email));

        if (existing.length > 0) {
            throw new Error("Hospital already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const result = await db.insert(hospitals).values({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        return {
            id: result[0].insertId,
            name: data.name,
            email: data.email,
        };
    }

    // =========================
    // LOGIN HOSPITAL
    // =========================
    static async login(data: any) {
    const hospital = await db
        .select()
        .from(hospitals)
        .where(eq(hospitals.email, data.email));

    if (hospital.length === 0) {
        throw new Error("Hospital not found");
    }

    const isPasswordValid = await bcrypt.compare(
        data.password,
        hospital[0].password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: hospital[0].id,
            email: hospital[0].email,
            role: "hospital",
        },
        "SECRET_KEY",
        { expiresIn: "7d" }
    );

    return {
        id: hospital[0].id,
        name: hospital[0].name,
        email: hospital[0].email,
        token,
    };
}

static async getDoctors(hospitalId: number) {
    const result = await db
        .select()
        .from(doctors)
        .where(eq(doctors.hospitalId, hospitalId));

    return result.map(doc => ({
        id: doc.id,
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        dob: doc.dob,
    }));
}
}