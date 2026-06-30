import { db } from "../../db";
import { monitoringMasters } from "../../db/schema/monitoringMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class MonitoringMasterService {

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
} catch (error: any) {

        throw new Error(
            error.message || "Failed to create monitoring master."
        );

    }

}

    static async getAll(
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
}catch (error: any) {

        throw new Error(
            error.message || "Failed to fetch monitoring masters."
        );

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
}catch (error: any) {

        throw new Error(
            error.message || "Failed to search monitoring masters."
        );

    }

}

    static async update(
    id: number,
    doctorId: number,
    body: any
) { try{

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
}catch (error: any) {

        throw new Error(
            error.message || "Failed to update monitoring master."
        );

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
}catch (error: any) {

        throw new Error(
            error.message || "Failed to delete monitoring master."
        );

    }

}
}