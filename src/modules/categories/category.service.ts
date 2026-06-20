import { db } from "../../db";
import { categories } from "../../db/schema/categories";
import { eq, and } from "drizzle-orm";

export class CategoryService {

    static async createCategory(
        doctorId: number,
        name: string
    ) {

        const result = await db
            .insert(categories)
            .values({
                doctorId,
                name,
            });

        return {
            id: result[0].insertId,
            doctorId,
            name,
        };
    }

    static async getCategories(
        doctorId: number
    ) {

        return await db
            .select()
            .from(categories)
            .where(eq(categories.doctorId, doctorId));
    }

    static async updateCategory(
    id: number,
    doctorId: number,
    name: string
) {

    await db
        .update(categories)
        .set({
            name,
        })
        .where(
            and(
                eq(categories.id, id),
                eq(categories.doctorId, doctorId)
            )
        );

    return {
        id,
        doctorId,
        name,
    };
}

static async deleteCategory(
    id: number,
    doctorId: number
) {

    await db
        .delete(categories)
        .where(
            and(
                eq(categories.id, id),
                eq(categories.doctorId, doctorId)
            )
        );

    return {
        message: "Category deleted successfully",
    };
}

}