import { db } from "../../db";
import { monitoringMasters } from "../../db/schema/monitoringMasters";
import { eq, and, like } from "drizzle-orm";

export class MonitoringMasterService {

    static async create(data: any) {

        const result = await db
            .insert(monitoringMasters)
            .values({
                doctorId: data.doctorId,
                monitoringInstruction: data.monitoringInstruction,
            });

        return {
            id: result[0].insertId,
            ...data,
        };
    }

    static async getAll(doctorId: number) {

        return await db
            .select()
            .from(monitoringMasters)
            .where(
                eq(monitoringMasters.doctorId, doctorId)
            );
    }

    static async search(
        doctorId: number,
        keyword: string
    ) {

        return await db
            .select()
            .from(monitoringMasters)
            .where(
                and(
                    eq(monitoringMasters.doctorId, doctorId),
                    like(
                        monitoringMasters.monitoringInstruction,
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
            .update(monitoringMasters)
            .set({
                monitoringInstruction: body.monitoringInstruction,
            })
            .where(
                and(
                    eq(monitoringMasters.id, id),
                    eq(monitoringMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Monitoring updated successfully",
        };
    }

    static async delete(
        id: number,
        doctorId: number
    ) {

        await db
            .delete(monitoringMasters)
            .where(
                and(
                    eq(monitoringMasters.id, id),
                    eq(monitoringMasters.doctorId, doctorId)
                )
            );

        return {
            message: "Monitoring deleted successfully",
        };
    }
}