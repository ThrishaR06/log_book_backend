import { db } from "../db";
import { categories } from "../db/schema/categories";
import { and, eq } from "drizzle-orm";

export class DoctorCategoryValidator {
    static async validate(doctorId: number, categoryId: number) {
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
                message: "Doctor and category mapping not found.",
                data: null,
            };
        }

        return {
            success: true,
            data: category,
        };
    }
}