import { db } from "../../db";
import { followUpMasters } from "../../db/schema/followUpMasters";
import { eq, and, like } from "drizzle-orm";

export class FollowUpMasterService {

    static async create(data: any) {

        const result = await db
            .insert(followUpMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                followUpInstruction: data.followUpInstruction,
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
            .from(followUpMasters)
            .where(
                and(
                    eq(followUpMasters.doctorId, doctorId),
                    eq(followUpMasters.categoryId, categoryId)
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
            .from(followUpMasters)
            .where(
                and(
                    eq(followUpMasters.doctorId, doctorId),
                    eq(followUpMasters.categoryId, categoryId),
                    like(
                        followUpMasters.followUpInstruction,
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
            .update(followUpMasters)
            .set({
                categoryId: body.categoryId,
                followUpInstruction: body.followUpInstruction,
            })
            .where(
                and(
                    eq(followUpMasters.id, id),
                    eq(followUpMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Follow Up updated successfully",
        };
    }

    static async delete(
        id: number,
        doctorId: number,
        categoryId: number
    ) {

        await db
            .delete(followUpMasters)
            .where(
                and(
                    eq(followUpMasters.id, id),
                    eq(followUpMasters.doctorId, doctorId),
                    eq(followUpMasters.categoryId, categoryId)
                )
            );

        return {
            message: "Follow Up deleted successfully",
        };
    }

}