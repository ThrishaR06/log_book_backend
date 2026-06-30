import { db } from "../../db";
import { ivFluidMasters } from "../../db/schema/ivFluidMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class IvFluidMasterService {

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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to create IV fluid master."
        );
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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to fetch IV fluid masters."
        );
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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to search IV fluid masters."
        );
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

        const [updatedIvFluid] = await db
            .select()
            .from(ivFluidMasters)
            .where(
                and(
                    eq(ivFluidMasters.id, id),
                    eq(ivFluidMasters.doctorId, doctorId)
                )
            );

        return updatedIvFluid;

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to update IV fluid master."
        );
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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to delete IV fluid master."
        );
    }
}
}