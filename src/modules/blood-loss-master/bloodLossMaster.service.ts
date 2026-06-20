import { db } from "../../db";
import { bloodLossMaster } from "../../db/schema/bloodLossMaster";
import { and, desc, eq, like } from "drizzle-orm";
import { ApiResponse } from "../../utils/apiResponse";
import { categories } from "../../db/schema/categories";

export class BloodLossMasterService {

    // =========================
    // CREATE
    // =========================
    static async create({
        doctorId,
        categoryId,
        instruction,
    }: {
        doctorId: number;
        categoryId: number;
        instruction: string;
    }) {

        // Check whether the category belongs to the logged-in doctor
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
    return ApiResponse.error("Category not found.");
}

const [result] = await db
    .insert(bloodLossMaster)
    .values({
        doctorId,
        categoryId,
        instruction,
    })
    .$returningId();

const [data] = await db
    .select()
    .from(bloodLossMaster)
    .where(eq(bloodLossMaster.id, result.id));

return ApiResponse.success(
    data,
    "Blood loss master created successfully."
);
    }

    // =========================
    // GET ALL
    // =========================
    static async getAll({
        doctorId,
        categoryId,
    }: {
        doctorId: number;
        categoryId: number;
    }) {

        // Verify category belongs to doctor
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
    return ApiResponse.error("Category not found.");
}

        const data = await db
            .select()
            .from(bloodLossMaster)
            .where(
                and(
                    eq(bloodLossMaster.doctorId, doctorId),
                    eq(bloodLossMaster.categoryId, categoryId)
                )
            )
            .orderBy(desc(bloodLossMaster.id));

        return ApiResponse.success(
    data,
    "Blood loss masters fetched successfully."
);
    }

    // =========================
    // GET BY ID
    // =========================
    static async getById({
        id,
        doctorId,
    }: {
        id: number;
        doctorId: number;
    }) {

        const [data] = await db
            .select()
            .from(bloodLossMaster)
            .where(
                and(
                    eq(bloodLossMaster.id, id),
                    eq(bloodLossMaster.doctorId, doctorId)
                )
            );

        if (!data) {
            return {
                success: false,
                message: "Blood loss master not found.",
            };
        }

        return ApiResponse.success(
    data,
    "Blood loss master fetched successfully."
);
    }

    // =========================
    // UPDATE
    // =========================
    static async update({
        id,
        doctorId,
        categoryId,
        instruction,
    }: {
        id: number;
        doctorId: number;
        categoryId: number;
        instruction: string;
    }) {

        const [existing] = await db
            .select()
            .from(bloodLossMaster)
            .where(
                and(
                    eq(bloodLossMaster.id, id),
                    eq(bloodLossMaster.doctorId, doctorId)
                )
            );

        if (!existing) {
            return {
                success: false,
                message: "Blood loss master not found.",
            };
        }

        // Verify new category belongs to doctor
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
    return ApiResponse.error("Category not found.");
}

       await db
.update(bloodLossMaster)
.set({
    categoryId,
    instruction,
})
.where(eq(bloodLossMaster.id, id));

const [data] = await db
.select()
.from(bloodLossMaster)
.where(eq(bloodLossMaster.id, id));

return ApiResponse.success(
    data,
    "Blood loss master updated successfully."
);
    }

    // =========================
    // DELETE
    // =========================
    static async delete({
        id,
        doctorId,
    }: {
        id: number;
        doctorId: number;
    }) {

       const [existing] = await db
.select()
.from(bloodLossMaster)
.where(
    and(
        eq(bloodLossMaster.id, id),
        eq(bloodLossMaster.doctorId, doctorId)
    )
);

if (!existing) {

    return ApiResponse.error(
        "Blood loss master not found."
    );

}

await db
.delete(bloodLossMaster)
.where(eq(bloodLossMaster.id, id));

return ApiResponse.success(
    existing,
    "Blood loss master deleted successfully."
);
    }

    // =========================
    // SEARCH
    // =========================
    static async search({
        doctorId,
        categoryId,
        search,
    }: {
        doctorId: number;
        categoryId: number;
        search: string;
    }) {

        // Verify category belongs to doctor
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
    return ApiResponse.error("Category not found.");
}

        const data = await db
            .select()
            .from(bloodLossMaster)
            .where(
                and(
                    eq(bloodLossMaster.doctorId, doctorId),
                    eq(bloodLossMaster.categoryId, categoryId),
                    like(bloodLossMaster.instruction, `%${search}%`)
                )
            )
            .orderBy(desc(bloodLossMaster.id));

        return ApiResponse.success(
    data,
    "Blood loss search completed."
);
    }

}