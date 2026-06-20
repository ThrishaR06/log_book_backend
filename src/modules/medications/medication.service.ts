import { db } from "../../db";
import { medicationMasters } from "../../db/schema/medicationMasters";
import { ApiResponse } from "../../utils/apiResponse";
import { eq, like, and } from "drizzle-orm";


export class MedicationService {

    // =========================
    // CREATE
    // =========================
    static async create(data: any) {
        const [result] = await db
            .insert(medicationMasters)
            .values({
                medicationName: data.medicationName,
                route: data.route,
                frequency: data.frequency,
                doctorId: data.doctorId,
                categoryId: data.categoryId,
            })
            .$returningId();

        const [created] = await db
            .select()
            .from(medicationMasters)
            .where(eq(medicationMasters.id, result.id));

        return ApiResponse.success(
            created,
            "Medication master created successfully."
        );
    }

    // =========================
    // GET ALL
    // =========================
    static async getAll(doctorId: number, categoryId: number) {
        const data = await db
            .select()
            .from(medicationMasters)
            .where(
                and(
                    eq(medicationMasters.doctorId, doctorId),
                    eq(medicationMasters.categoryId, categoryId)
                )
            );

        return ApiResponse.success(
            data,
            "Medication masters fetched successfully."
        );
    }

    // =========================
    // SEARCH
    // =========================
    static async search(categoryId: number, keyword: string) {

    return await db
        .select()
        .from(medicationMasters)
        .where(
            and(
                eq(medicationMasters.categoryId, categoryId),
                like(medicationMasters.medicationName, `%${keyword}%`)
            )
        );
}
    // =========================
    // UPDATE
    // =========================
    static async update(id: number, data: any) {

        await db
            .update(medicationMasters)
            .set({
                medicationName: data.medicationName,
                route: data.route,
                frequency: data.frequency,
                categoryId: data.categoryId,
                updatedAt: new Date(),
            })
            .where(eq(medicationMasters.id, id));

        const [updated] = await db
            .select()
            .from(medicationMasters)
            .where(eq(medicationMasters.id, id));

        return ApiResponse.success(
            updated,
            "Medication master updated successfully."
        );
    }

    // =========================
    // DELETE
    // =========================
    static async delete(id: number) {

        const [existing] = await db
            .select()
            .from(medicationMasters)
            .where(eq(medicationMasters.id, id));

        if (!existing) {
            return ApiResponse.error("Medication master not found.");
        }

        await db
            .delete(medicationMasters)
            .where(eq(medicationMasters.id, id));

        return ApiResponse.success(
            existing,
            "Medication master deleted successfully."
        );
    }
}