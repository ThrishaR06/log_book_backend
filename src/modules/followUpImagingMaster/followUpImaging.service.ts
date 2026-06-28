import { db } from "../../db";
import { followUpImagingMasters } from "../../db/schema/followUpImagingMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class FollowUpImagingMasterService {

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
        .insert(followUpImagingMasters)
        .values({
            doctorId: data.doctorId,
            categoryId: data.categoryId,
            followUpImagingInstruction:
                data.followUpImagingInstruction,
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
        .from(followUpImagingMasters)
        .where(
            and(
                eq(
                    followUpImagingMasters.doctorId,
                    doctorId
                ),
                eq(
                    followUpImagingMasters.categoryId,
                    categoryId
                )
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
        .from(followUpImagingMasters)
        .where(
            and(
                eq(
                    followUpImagingMasters.doctorId,
                    doctorId
                ),
                eq(
                    followUpImagingMasters.categoryId,
                    categoryId
                ),
                like(
                    followUpImagingMasters.followUpImagingInstruction,
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
        .update(followUpImagingMasters)
        .set({
            categoryId: body.categoryId,
            followUpImagingInstruction:
                body.followUpImagingInstruction,
        })
        .where(
            and(
                eq(followUpImagingMasters.id, id),
                eq(
                    followUpImagingMasters.doctorId,
                    doctorId
                )
            )
        );

    const [updatedFollowUpImaging] = await db
    .select()
    .from(followUpImagingMasters)
    .where(
        and(
            eq(followUpImagingMasters.id, id),
            eq(
                followUpImagingMasters.doctorId,
                doctorId
            )
        )
    );

return updatedFollowUpImaging;
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
        .delete(followUpImagingMasters)
        .where(
            and(
                eq(followUpImagingMasters.id, id),
                eq(
                    followUpImagingMasters.doctorId,
                    doctorId
                ),
                eq(
                    followUpImagingMasters.categoryId,
                    categoryId
                )
            )
        );

    return {
        message:
            "Follow Up Imaging deleted successfully",
    };
}

}