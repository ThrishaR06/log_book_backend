import { db } from "../../db";
import { drainManagementMasters } from "../../db/schema/drainManagementMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class DrainManagementMasterService {

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
        return {
            success: false,
            message: "Category not found."
        };
    }

    const result = await db
        .insert(drainManagementMasters)
        .values({
            doctorId: data.doctorId,
            categoryId: data.categoryId,
            drainInstruction: data.drainInstruction,
        });

    return {
        id: result[0].insertId,
        ...data,
    };
}catch (error: any) {

        console.error("CREATE DRAIN MANAGEMENT SERVICE ERROR =", error);

        throw error;

    }}

    static async getAll(
    doctorId: number,
    categoryId: number
) {
    try{

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
        .from(drainManagementMasters)
        .where(
            and(
                eq(drainManagementMasters.doctorId, doctorId),
                eq(drainManagementMasters.categoryId, categoryId)
            )
        );
}catch (error: any) {

        console.error("GET ALL DRAIN MANAGEMENT SERVICE ERROR =", error);

        throw error;

    }

}

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
        return {
            success: false,
            message: "Category not found."
        };
    }

    return await db
        .select()
        .from(drainManagementMasters)
        .where(
            and(
                eq(drainManagementMasters.doctorId, doctorId),
                eq(drainManagementMasters.categoryId, categoryId),
                like(
                    drainManagementMasters.drainInstruction,
                    `%${keyword}%`
                )
            )
        );
}catch (error: any) {

        console.error("SEARCH DRAIN MANAGEMENT SERVICE ERROR =", error);

        throw error;

    }

}

    static async update(
    id: number,
    doctorId: number,
    body: any
) {
    try{

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
        .update(drainManagementMasters)
        .set({
            categoryId: body.categoryId,
            drainInstruction: body.drainInstruction,
        })
        .where(
            and(
                eq(drainManagementMasters.id, id),
                eq(drainManagementMasters.doctorId, doctorId)
            )
        );

    const [updatedDrainManagement] = await db
    .select()
    .from(drainManagementMasters)
    .where(
        and(
            eq(drainManagementMasters.id, id),
            eq(drainManagementMasters.doctorId, doctorId)
        )
    );

return updatedDrainManagement;
}catch (error: any) {

        console.error("UPDATE DRAIN MANAGEMENT SERVICE ERROR =", error);

        throw error;

    }

}

    static async delete(
    id: number,
    doctorId: number,
    categoryId: number
) {
    try{

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
        .delete(drainManagementMasters)
        .where(
            and(
                eq(drainManagementMasters.id, id),
                eq(drainManagementMasters.doctorId, doctorId),
                eq(drainManagementMasters.categoryId, categoryId)
            )
        );

    return {
        message: "Drain Management deleted successfully",
    };
}catch (error: any) {

        console.error("DELETE DRAIN MANAGEMENT SERVICE ERROR =", error);

        throw error;

    }

}

}