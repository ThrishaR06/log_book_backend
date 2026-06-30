import { db } from "../../db";
import { specialInstructionMasters } from "../../db/schema/specialInstructionMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class SpecialInstructionMasterService {

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
            .insert(specialInstructionMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                specialInstruction: data.specialInstruction,
            });

        return {
            id: result[0].insertId,
            ...data,
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

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
            .from(specialInstructionMasters)
            .where(
                and(
                    eq(specialInstructionMasters.doctorId, doctorId),
                    eq(specialInstructionMasters.categoryId, categoryId)
                )
            );

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

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
            .from(specialInstructionMasters)
            .where(
                and(
                    eq(specialInstructionMasters.doctorId, doctorId),
                    eq(specialInstructionMasters.categoryId, categoryId),
                    like(
                        specialInstructionMasters.specialInstruction,
                        `%${keyword}%`
                    )
                )
            );

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

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
            .update(specialInstructionMasters)
            .set({
                categoryId: body.categoryId,
                specialInstruction: body.specialInstruction,
            })
            .where(
                and(
                    eq(specialInstructionMasters.id, id),
                    eq(specialInstructionMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Special Instruction updated successfully",
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

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
            .delete(specialInstructionMasters)
            .where(
                and(
                    eq(specialInstructionMasters.id, id),
                    eq(specialInstructionMasters.doctorId, doctorId),
                    eq(specialInstructionMasters.categoryId, categoryId)
                )
            );

        return {
            message: "Special Instruction deleted successfully",
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

    }

}

}