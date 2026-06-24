import { db } from "../../db";
import { followUpMasters } from "../../db/schema/followUpMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class FollowUpMasterService {

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
        .insert(followUpMasters)
        .values({
            doctorId: data.doctorId,
            categoryId: data.categoryId,
            followUpInstruction: data.followUpInstruction,
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
        .from(followUpMasters)
        .where(
            and(
                eq(followUpMasters.doctorId, doctorId),
                eq(followUpMasters.categoryId, categoryId)
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
        .from(followUpMasters)
        .where(
            and(
                eq(followUpMasters.doctorId, doctorId),
                eq(followUpMasters.categoryId, categoryId),
                like(
                    followUpMasters.followUpInstruction,
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
        .update(followUpMasters)
        .set({
            categoryId: body.categoryId,
            followUpInstruction: body.followUpInstruction,
        })
        .where(
            and(
                eq(followUpMasters.id, id),
                eq(followUpMasters.doctorId, doctorId)
            )
        );

    return {
        message: "Follow Up updated successfully",
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
        .delete(followUpMasters)
        .where(
            and(
                eq(followUpMasters.id, id),
                eq(followUpMasters.doctorId, doctorId),
                eq(followUpMasters.categoryId, categoryId)
            )
        );

    return {
        message: "Follow Up deleted successfully",
    };
}

}