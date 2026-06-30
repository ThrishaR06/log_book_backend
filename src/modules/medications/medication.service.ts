import { db } from "../../db";
import { medicationMasters } from "../../db/schema/medicationMasters";
import { ApiResponse } from "../../utils/apiResponse";
import { eq, like, and } from "drizzle-orm";
import { categories } from "../../db/schema/categories";


export class MedicationService {

    // =========================
    // CREATE
    // =========================
    static async create(data: any) {
        try{

    const [category] = await db
        .select()
        .from(categories)
        .where(
            and(
                eq(categories.id, data.categoryId),
                eq(categories.doctorId, data.doctorId)
            )
        );

    if (!category) {
        return ApiResponse.error("Category not found.");
    }

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
}catch (error: any) {

        throw new Error(
            error.message || "Failed to create medication master."
        );

    }

}

    // =========================
    // GET ALL
    // =========================
    static async getAll(
    doctorId: number,
    categoryId: number
) {  try{

    const [category] = await db
        .select()
        .from(categories)
        .where(
            and(
                eq(categories.id, categoryId),
                eq(categories.doctorId, doctorId)
            )
        );

    if (!category) {
        return ApiResponse.error("Category not found.");
    }

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
} catch (error: any) {

        throw new Error(
            error.message || "Failed to fetch medication masters."
        );

    }

}

    // =========================
    // SEARCH
    // =========================
    static async search(
    doctorId: number,
    categoryId: number,
    keyword: string
) { try{

    const [category] = await db
        .select()
        .from(categories)
        .where(
            and(
                eq(categories.id, categoryId),
                eq(categories.doctorId, doctorId)
            )
        );

    if (!category) {
        return ApiResponse.error("Category not found.");
    }

    const data = await db
        .select()
        .from(medicationMasters)
        .where(
            and(
                eq(medicationMasters.doctorId, doctorId),
                eq(medicationMasters.categoryId, categoryId),
                like(
                    medicationMasters.medicationName,
                    `%${keyword}%`
                )
            )
        );

    return ApiResponse.success(
        data,
        "Medication search completed."
    );
} catch (error: any) {

        throw new Error(
            error.message || "Failed to search medication masterss"
        );

    }

}
    // =========================
    // UPDATE
    // =========================
    static async update(
    id: number,
    doctorId: number,
    data: any
) { try{

    const [category] = await db
        .select()
        .from(categories)
        .where(
            and(
                eq(categories.id, data.categoryId),
                eq(categories.doctorId, doctorId)
            )
        );

    if (!category) {
        return ApiResponse.error("Category not found.");
    }

    await db
        .update(medicationMasters)
        .set({
            medicationName: data.medicationName,
            route: data.route,
            frequency: data.frequency,
            categoryId: data.categoryId,
            updatedAt: new Date(),
        })
        .where(
            and(
                eq(medicationMasters.id, id),
                eq(medicationMasters.doctorId, doctorId)
            )
        );

    const [updated] = await db
        .select()
        .from(medicationMasters)
        .where(eq(medicationMasters.id, id));

    return ApiResponse.success(
        updated,
        "Medication master updated successfully."
    );
}catch (error: any) {

        throw new Error(
            error.message || "Failed to update medication master."
        );

    }

}

    // =========================
    // DELETE
    // =========================
    static async delete(
    id: number,
    doctorId: number,
    categoryId: number
) { try{

    const [category] = await db
        .select()
        .from(categories)
        .where(
            and(
                eq(categories.id, categoryId),
                eq(categories.doctorId, doctorId)
            )
        );

    if (!category) {
        return ApiResponse.error("Category not found.");
    }

    const [existing] = await db
        .select()
        .from(medicationMasters)
        .where(
            and(
                eq(medicationMasters.id, id),
                eq(medicationMasters.doctorId, doctorId),
                eq(medicationMasters.categoryId, categoryId)
            )
        );

    if (!existing) {
        return ApiResponse.error(
            "Medication master not found."
        );
    }

    await db
        .delete(medicationMasters)
        .where(eq(medicationMasters.id, id));

    return ApiResponse.success(
        existing,
        "Medication master deleted successfully."
    );
}catch (error: any) {

        throw new Error(
            error.message || "Failed to delete medication master."
        );

    }

}
}