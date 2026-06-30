import { db } from "../../db";
import { dietMasters } from "../../db/schema/dietMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";
import { ApiResponse } from "../../utils/apiResponse";
export class DietMasterService {

    static async create(data: any) {

    try {

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
            return {
                success: false,
                message: "Category not found."
            };
        }

        const result = await db
            .insert(dietMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                dietInstruction: data.dietInstruction,
            });

        return {
            id: result[0].insertId,
            ...data,
        };

    } catch (error) {

        console.error(
            "SERVICE CREATE DIET MASTER ERROR =",
            error
        );

        throw error;

    }

}

    static async getAll(
    doctorId: number,
    categoryId: number
) {

    try {

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
            return {
                success: false,
                message: "Category not found."
            };
        }

        return await db
            .select()
            .from(dietMasters)
            .where(
                and(
                    eq(dietMasters.doctorId, doctorId),
                    eq(dietMasters.categoryId, categoryId)
                )
            );

    } catch (error) {

        console.error(
            "SERVICE GET DIET MASTER ERROR =",
            error
        );

        throw error;

    }

}

   static async search(
    doctorId: number,
    categoryId: number,
    keyword: string
) {

    try {

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
            return {
                success: false,
                message: "Category not found."
            };
        }

        return await db
            .select()
            .from(dietMasters)
            .where(
                and(
                    eq(dietMasters.doctorId, doctorId),
                    eq(dietMasters.categoryId, categoryId),
                    like(
                        dietMasters.dietInstruction,
                        `%${keyword}%`
                    )
                )
            );

    } catch (error) {

        console.error(
            "SERVICE SEARCH DIET MASTER ERROR =",
            error
        );

        throw error;

    }

}

    static async update(
    id: number,
    doctorId: number,
    body: any
) {

    try {

        const [category] = await db
            .select()
            .from(categories)
            .where(
                and(
                    eq(categories.id, body.categoryId),
                    eq(categories.doctorId, doctorId)
                )
            );

        if (!category) {
            return {
                success: false,
                message: "Category not found."
            };
        }

        await db
            .update(dietMasters)
            .set({
                categoryId: body.categoryId,
                dietInstruction: body.dietInstruction,
            })
            .where(
                and(
                    eq(dietMasters.id, id),
                    eq(dietMasters.doctorId, doctorId)
                )
            );

        const [updatedDiet] = await db
            .select()
            .from(dietMasters)
            .where(
                and(
                    eq(dietMasters.id, id),
                    eq(dietMasters.doctorId, doctorId)
                )
            );

        return ApiResponse.success(
            updatedDiet,
            "Diet updated successfully."
        );

    } catch (error) {

        console.error(
            "SERVICE UPDATE DIET MASTER ERROR =",
            error
        );

        throw error;

    }

}
    static async delete(
    id: number,
    doctorId: number,
    categoryId: number
) {

    try {

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
            return {
                success: false,
                message: "Category not found."
            };
        }

        await db
            .delete(dietMasters)
            .where(
                and(
                    eq(dietMasters.id, id),
                    eq(dietMasters.doctorId, doctorId),
                    eq(dietMasters.categoryId, categoryId)
                )
            );

        return {
            message: "Diet deleted successfully",
        };

    } catch (error) {

        console.error(
            "SERVICE DELETE DIET MASTER ERROR =",
            error
        );

        throw error;

    }

}

}