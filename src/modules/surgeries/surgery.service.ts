import { db } from "../../db";
import { surgeries } from "../../db/schema/surgeries";
import { eq, and } from "drizzle-orm";
import { NotificationService } from "../notifications/notification.service";

export class SurgeryService {

    static async createSurgery(data: any) {

        const result = await db.insert(surgeries).values({
            doctorId: data.doctorId,
            hospitalId: data.hospitalId,
            templateId: data.templateId,
            surgeryDate: data.surgeryDate,
            earnings: data.earnings,
            notes: data.notes,
        });

        await NotificationService.create({
    doctorId: data.doctorId,
    title: "Surgery Created",
    message: `Surgery on ${data.surgeryDate} has been recorded successfully.`,
});

        return {
            id: result[0].insertId,
            doctorId: data.doctorId,
            hospitalId: data.hospitalId,
            templateId: data.templateId,
            surgeryDate: data.surgeryDate,
            earnings: data.earnings,
            notes: data.notes,
        };
    }

    static async getSurgeries(doctorId: number) {

        return await db
            .select()
            .from(surgeries)
            .where(eq(surgeries.doctorId, doctorId));
    }

    static async getSurgeryById(
        id: number,
        doctorId: number
    ) {

        const surgery = await db
            .select()
            .from(surgeries)
            .where(
                and(
                    eq(surgeries.id, id),
                    eq(surgeries.doctorId, doctorId)
                )
            );

        return surgery[0] || null;
    }

    static async updateSurgery(
        id: number,
        doctorId: number,
        data: any
    ) {

        await db
            .update(surgeries)
            .set({
                hospitalId: data.hospitalId,
                templateId: data.templateId,
                surgeryDate: data.surgeryDate,
                earnings: data.earnings,
                notes: data.notes,
            })
            .where(
                and(
                    eq(surgeries.id, id),
                    eq(surgeries.doctorId, doctorId)
                )
            );

        return {
            id,
            doctorId,
            ...data,
        };
    }

    static async deleteSurgery(
        id: number,
        doctorId: number
    ) {

        await db
            .delete(surgeries)
            .where(
                and(
                    eq(surgeries.id, id),
                    eq(surgeries.doctorId, doctorId)
                )
            );

        return {
            message: "Surgery deleted successfully",
        };
    }
}