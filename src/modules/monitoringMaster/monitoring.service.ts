import { db } from "../../db";
import { monitoringMasters } from "../../db/schema/monitoringMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class MonitoringMasterService {

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
        .insert(monitoringMasters)
        .values({
            doctorId: data.doctorId,
            categoryId: data.categoryId,
            monitoringInstruction: data.monitoringInstruction,
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
        .from(monitoringMasters)
        .where(
            and(
                eq(monitoringMasters.doctorId, doctorId),
                eq(monitoringMasters.categoryId, categoryId)
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
        .from(monitoringMasters)
        .where(
            and(
                eq(monitoringMasters.doctorId, doctorId),
                eq(monitoringMasters.categoryId, categoryId),
                like(
                    monitoringMasters.monitoringInstruction,
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
        .update(monitoringMasters)
        .set({
            categoryId: body.categoryId,
            monitoringInstruction: body.monitoringInstruction,
        })
        .where(
            and(
                eq(monitoringMasters.id, id),
                eq(monitoringMasters.doctorId, doctorId)
            )
        );

    return {
        message: "Monitoring updated successfully",
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
        .delete(monitoringMasters)
        .where(
            and(
                eq(monitoringMasters.id, id),
                eq(monitoringMasters.doctorId, doctorId),
                eq(monitoringMasters.categoryId, categoryId)
            )
        );

    return {
        message: "Monitoring deleted successfully",
    };
}
}