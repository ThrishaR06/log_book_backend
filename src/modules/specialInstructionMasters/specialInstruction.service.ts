import { db } from "../../db";
import { specialInstructionMasters } from "../../db/schema/specialInstructionMasters";
import { eq, and, like } from "drizzle-orm";

export class SpecialInstructionMasterService {

    static async create(data: any) {

        const result = await db
            .insert(specialInstructionMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                specialInstruction: data.specialInstruction,
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

        return await db
            .select()
            .from(specialInstructionMasters)
            .where(
                and(
                    eq(specialInstructionMasters.doctorId, doctorId),
                    eq(specialInstructionMasters.categoryId, categoryId)
                )
            );
    }

    static async search(
        doctorId: number,
        categoryId: number,
        keyword: string
    ) {

        return await db
            .select()
            .from(specialInstructionMasters)
            .where(
                and(
                    eq(specialInstructionMasters.doctorId, doctorId),
                    eq(specialInstructionMasters.categoryId, categoryId),
                    like(
                        specialInstructionMasters.specialInstruction,
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

        await db
            .update(specialInstructionMasters)
            .set({
                categoryId: body.categoryId,
                specialInstruction: body.specialInstruction,
            })
            .where(
                and(
                    eq(specialInstructionMasters.id, id),
                    eq(specialInstructionMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Special Instruction updated successfully",
        };
    }

    static async delete(
        id: number,
        doctorId: number,
        categoryId: number
    ) {

        await db
            .delete(specialInstructionMasters)
            .where(
                and(
                    eq(specialInstructionMasters.id, id),
                    eq(specialInstructionMasters.doctorId, doctorId),
                    eq(specialInstructionMasters.categoryId, categoryId)
                )
            );

        return {
            message: "Special Instruction deleted successfully",
        };
    }

}