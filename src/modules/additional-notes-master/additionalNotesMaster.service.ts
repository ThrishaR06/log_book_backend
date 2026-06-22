import { db } from "../../db";
import { additionalNotesMaster } from "../../db/schema/additionalNotesMaster";
import { and, desc, eq, like } from "drizzle-orm";
import { ApiResponse } from "../../utils/apiResponse";
import { categories } from "../../db/schema/categories";

export class AdditionalNotesMasterService {
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
        and(eq(categories.id, categoryId), eq(categories.doctorId, doctorId)),
      );

    if (!category) {
      return ApiResponse.error("Category not found.");
    }

    const [result] = await db
      .insert(additionalNotesMaster)
      .values({
        doctorId,
        categoryId,
        instruction,
      })
      .$returningId();

    const [data] = await db
      .select()
      .from(additionalNotesMaster)
      .where(eq(additionalNotesMaster.id, result.id));

    return ApiResponse.success(
      data,
      "Additional notes master created successfully.",
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
        and(eq(categories.id, categoryId), eq(categories.doctorId, doctorId)),
      );

    if (!category) {
      return ApiResponse.error("Category not found.");
    }

    const data = await db
      .select()
      .from(additionalNotesMaster)
      .where(
        and(
          eq(additionalNotesMaster.doctorId, doctorId),
          eq(additionalNotesMaster.categoryId, categoryId),
        ),
      )
      .orderBy(desc(additionalNotesMaster.id));

    return ApiResponse.success(
      data,
      "Additional notes masters fetched successfully.",
    );
  }

  // =========================
  // GET BY ID
  // =========================
  static async getById({ id, doctorId }: { id: number; doctorId: number }) {
    const [data] = await db
      .select()
      .from(additionalNotesMaster)
      .where(
        and(
          eq(additionalNotesMaster.id, id),
          eq(additionalNotesMaster.doctorId, doctorId),
        ),
      );

    if (!data) {
      return ApiResponse.error("Additional notes master not found.");
    }

    return ApiResponse.success(
      data,
      "Additional notes master fetched successfully.",
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
      .from(additionalNotesMaster)
      .where(
        and(
          eq(additionalNotesMaster.id, id),
          eq(additionalNotesMaster.doctorId, doctorId),
        ),
      );

    if (!existing) {
      return {
        success: false,
        message: "Additional notes master not found.",
      };
    }

    // Verify category belongs to logged-in doctor
    const [category] = await db
      .select()
      .from(categories)
      .where(
        and(eq(categories.id, categoryId), eq(categories.doctorId, doctorId)),
      );

    if (!category) {
      return ApiResponse.error("Category not found.");
    }

    await db
      .update(additionalNotesMaster)
      .set({
        categoryId,
        instruction,
      })
      .where(eq(additionalNotesMaster.id, id));

    const [data] = await db
      .select()
      .from(additionalNotesMaster)
      .where(eq(additionalNotesMaster.id, id));

    return ApiResponse.success(
      data,
      "Additional notes master updated successfully.",
    );
  }

  // =========================
  // DELETE
  // =========================
  static async delete({ id, doctorId }: { id: number; doctorId: number }) {
    const [existing] = await db
      .select()
      .from(additionalNotesMaster)
      .where(
        and(
          eq(additionalNotesMaster.id, id),
          eq(additionalNotesMaster.doctorId, doctorId),
        ),
      );

    if (!existing) {
      return {
        success: false,
        message: "Additional notes master not found.",
      };
    }

    await db
      .delete(additionalNotesMaster)
      .where(eq(additionalNotesMaster.id, id));

    return ApiResponse.success(
      existing,
      "Additional notes master deleted successfully.",
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
        and(eq(categories.id, categoryId), eq(categories.doctorId, doctorId)),
      );

    if (!category) {
      return ApiResponse.error("Category not found.");
    }

    const data = await db
      .select()
      .from(additionalNotesMaster)
      .where(
        and(
          eq(additionalNotesMaster.doctorId, doctorId),
          eq(additionalNotesMaster.categoryId, categoryId),
          like(additionalNotesMaster.instruction, `%${search}%`),
        ),
      )
      .orderBy(desc(additionalNotesMaster.id));

    return ApiResponse.success(
      data,
      "Additional notes master search completed.",
    );
  }
}
