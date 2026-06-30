import { db } from "../../db";
import { woundCareMasters } from "../../db/schema/woundCareMasters";
import { eq, and, like } from "drizzle-orm";
import { categories } from "../../db/schema/categories";

export class WoundCareMasterService {

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
            .insert(woundCareMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                woundInstruction: data.woundInstruction,
            });

        return {
            id: result[0].insertId,
            ...data,
        };

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to create wound care master."
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
            return {
                success: false,
                message: "Category not found."
            };
        }

        return await db
            .select()
            .from(woundCareMasters)
            .where(
                and(
                    eq(woundCareMasters.doctorId, doctorId),
                    eq(woundCareMasters.categoryId, categoryId)
                )
            );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to fetch wound care masters."
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
            return {
                success: false,
                message: "Category not found."
            };
        }

        return await db
            .select()
            .from(woundCareMasters)
            .where(
                and(
                    eq(woundCareMasters.doctorId, doctorId),
                    eq(woundCareMasters.categoryId, categoryId),
                    like(
                        woundCareMasters.woundInstruction,
                        `%${keyword}%`
                    )
                )
            );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to search wound care masters."
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
                message: "Category not found."
            };
        }

        await db
            .update(woundCareMasters)
            .set({
                categoryId: body.categoryId,
                woundInstruction: body.woundInstruction,
            })
            .where(
                and(
                    eq(woundCareMasters.id, id),
                    eq(woundCareMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Wound Care updated successfully",
        };

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to update wound care master."
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
                message: "Category not found."
            };
        }

        await db
            .delete(woundCareMasters)
            .where(
                and(
                    eq(woundCareMasters.id, id),
                    eq(woundCareMasters.doctorId, doctorId),
                    eq(woundCareMasters.categoryId, categoryId)
                )
            );

        return {
            message: "Wound Care deleted successfully",
        };

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to delete wound care master."
        );
    }
}

}