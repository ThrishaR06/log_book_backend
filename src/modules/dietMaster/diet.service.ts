import { db } from "../../db";
import { dietMasters } from "../../db/schema/dietMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";
export class DietMasterService {

    static async create(data: any) {

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
}

    static async getAll(
    doctorId: number,
    categoryId: number
) {

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
}

    static async search(
    doctorId: number,
    categoryId: number,
    keyword: string
) {

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
}

    static async update(
    id: number,
    doctorId: number,
    body: any
) {

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

    return {
        message: "Diet updated successfully",
    };
}
    static async delete(
    id: number,
    doctorId: number,
    categoryId: number
) {

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
}

}