import { db } from "../../db";
import { woundCareMasters } from "../../db/schema/woundCareMasters";
import { eq, and, like } from "drizzle-orm";

export class WoundCareMasterService {

    static async create(data: any) {

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
    }

    static async getAll(
        doctorId: number,
        categoryId: number
    ) {

        return await db
            .select()
            .from(woundCareMasters)
            .where(
                and(
                    eq(woundCareMasters.doctorId, doctorId),
                    eq(woundCareMasters.categoryId, categoryId)
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
    }

    static async update(
        id: number,
        doctorId: number,
        body: any
    ) {

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
    }

    static async delete(
        id: number,
        doctorId: number,
        categoryId: number
    ) {

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
    }

}