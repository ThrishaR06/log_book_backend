import { db } from "../../db";
import { ivFluidMasters } from "../../db/schema/ivFluidMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class IvFluidMasterService {

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
            message: "Category does not belong to this doctor."
        };
    }

    const result = await db
        .insert(ivFluidMasters)
        .values({
            doctorId: data.doctorId,
            categoryId: data.categoryId,
            fluidName: data.fluidName,
            defaultRate: data.defaultRate,
            notes: data.notes,
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
        return [];
    }

    return await db
        .select()
        .from(ivFluidMasters)
        .where(
            and(
                eq(ivFluidMasters.doctorId, doctorId),
                eq(ivFluidMasters.categoryId, categoryId)
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
        return [];
    }

    return await db
        .select()
        .from(ivFluidMasters)
        .where(
            and(
                eq(ivFluidMasters.doctorId, doctorId),
                eq(ivFluidMasters.categoryId, categoryId),
                like(
                    ivFluidMasters.fluidName,
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
        message: "Category does not belong to this doctor."
    };
}

        await db
            .update(ivFluidMasters)
            .set({
    categoryId: body.categoryId,
    fluidName: body.fluidName,
    defaultRate: body.defaultRate,
    notes: body.notes,
})
            .where(
                and(
                    eq(ivFluidMasters.id, id),
                    eq(ivFluidMasters.doctorId, doctorId)
                )
            );

        return {
            message: "IV Fluid updated successfully",
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
            message: "Category does not belong to this doctor."
        };
    }

    await db
        .delete(ivFluidMasters)
        .where(
            and(
                eq(ivFluidMasters.id, id),
                eq(ivFluidMasters.doctorId, doctorId),
                eq(ivFluidMasters.categoryId, categoryId)
            )
        );

    return {
        message: "IV Fluid deleted successfully",
    };
}
}