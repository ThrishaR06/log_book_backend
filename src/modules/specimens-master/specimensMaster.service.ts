import { db } from "../../db";
import { specimensMaster } from "../../db/schema/specimensMaster";
import { and, desc, eq, like } from "drizzle-orm";
import { ApiResponse } from "../../utils/apiResponse";
import { categories } from "../../db/schema/categories";

export class SpecimensMasterService {

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

        // Verify category belongs to logged-in doctor
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
    .insert(specimensMaster)
    .values({
        doctorId,
        categoryId,
        instruction,
    })
    .$returningId();

const [data] = await db
    .select()
    .from(specimensMaster)
    .where(eq(specimensMaster.id, result.id));

return ApiResponse.success(
    data,
    "Specimen master created successfully."
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

        // Verify category belongs to logged-in doctor
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
            .from(specimensMaster)
            .where(
                and(
                    eq(specimensMaster.doctorId, doctorId),
                    eq(specimensMaster.categoryId, categoryId)
                )
            )
            .orderBy(desc(specimensMaster.id));

        return ApiResponse.success(
    data,
    "Specimen masters fetched successfully."
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
            .from(specimensMaster)
            .where(
                and(
                    eq(specimensMaster.id, id),
                    eq(specimensMaster.doctorId, doctorId)
                )
            );

        if (!data) {
    return ApiResponse.error(
        "Specimen master not found."
    );
}

return ApiResponse.success(
    data,
    "Specimen master fetched successfully."
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
            .from(specimensMaster)
            .where(
                and(
                    eq(specimensMaster.id, id),
                    eq(specimensMaster.doctorId, doctorId)
                )
            );

        if (!existing) {
            return {
                success: false,
                message: "Specimen master not found.",
            };
        }

        // Verify category belongs to logged-in doctor
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
    .update(specimensMaster)
    .set({
        categoryId,
        instruction,
    })
    .where(eq(specimensMaster.id, id));

const [data] = await db
    .select()
    .from(specimensMaster)
    .where(eq(specimensMaster.id, id));

return ApiResponse.success(
    data,
    "Specimen master updated successfully."
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
            .from(specimensMaster)
            .where(
                and(
                    eq(specimensMaster.id, id),
                    eq(specimensMaster.doctorId, doctorId)
                )
            );

        if (!existing) {
            return {
                success: false,
                message: "Specimen master not found.",
            };
        }

        await db
            .delete(specimensMaster)
            .where(eq(specimensMaster.id, id));

       return ApiResponse.success(
    existing,
    "Specimen master deleted successfully."
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

        // Verify category belongs to logged-in doctor
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
            .from(specimensMaster)
            .where(
                and(
                    eq(specimensMaster.doctorId, doctorId),
                    eq(specimensMaster.categoryId, categoryId),
                    like(specimensMaster.instruction, `%${search}%`)
                )
            )
            .orderBy(desc(specimensMaster.id));

        return ApiResponse.success(
    data,
    "Specimens search completed."
);
    }
}