import { db } from "../../db";
import { drainManagementMasters } from "../../db/schema/drainManagementMasters";
import { eq, and, like } from "drizzle-orm";

export class DrainManagementMasterService {

    static async create(data: any) {

        const result = await db
            .insert(drainManagementMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                drainInstruction: data.drainInstruction,
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
            .from(drainManagementMasters)
            .where(
                and(
                    eq(drainManagementMasters.doctorId, doctorId),
                    eq(drainManagementMasters.categoryId, categoryId)
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
            .from(drainManagementMasters)
            .where(
                and(
                    eq(drainManagementMasters.doctorId, doctorId),
                    eq(drainManagementMasters.categoryId, categoryId),
                    like(
                        drainManagementMasters.drainInstruction,
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
            .update(drainManagementMasters)
            .set({
                categoryId: body.categoryId,
                drainInstruction: body.drainInstruction,
            })
            .where(
                and(
                    eq(drainManagementMasters.id, id),
                    eq(drainManagementMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Drain Management updated successfully",
        };
    }

    static async delete(
        id: number,
        doctorId: number,
        categoryId: number
    ) {

        await db
            .delete(drainManagementMasters)
            .where(
                and(
                    eq(drainManagementMasters.id, id),
                    eq(drainManagementMasters.doctorId, doctorId),
                    eq(drainManagementMasters.categoryId, categoryId)
                )
            );

        return {
            message: "Drain Management deleted successfully",
        };
    }

}