import { db } from "../../db";
import { surgeries } from "../../db/schema/surgeries";
import { hospitals } from "../../db/schema/hospitals";
import { templates } from "../../db/schema/templates";

import {
    eq,
    sql,
} from "drizzle-orm";

export class ReportsService {

    static async getSurgeryReport(
    doctorId: number,
    from?: string,
    to?: string
) {

    if (from && to) {
        return await db
            .select({
                id: surgeries.id,
                hospitalName: hospitals.name,
                templateName: templates.name,
                surgeryDate: surgeries.surgeryDate,
                earnings: surgeries.earnings,
                notes: surgeries.notes,
            })
            .from(surgeries)
            .innerJoin(
                hospitals,
                eq(surgeries.hospitalId, hospitals.id)
            )
            .innerJoin(
                templates,
                eq(surgeries.templateId, templates.id)
            )
            .where(sql`
                ${surgeries.doctorId} = ${doctorId}
                AND ${surgeries.surgeryDate}
                BETWEEN ${from} AND ${to}
            `);
    }

    return await db
        .select({
            id: surgeries.id,
            hospitalName: hospitals.name,
            templateName: templates.name,
            surgeryDate: surgeries.surgeryDate,
            earnings: surgeries.earnings,
            notes: surgeries.notes,
        })
        .from(surgeries)
        .innerJoin(
            hospitals,
            eq(surgeries.hospitalId, hospitals.id)
        )
        .innerJoin(
            templates,
            eq(surgeries.templateId, templates.id)
        )
        .where(eq(surgeries.doctorId, doctorId));
}
    static async getEarningsReport(
    doctorId: number,
    from?: string,
    to?: string
) {

    if (from && to) {

        const result = await db
            .select({
                totalEarnings: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
                totalSurgeries: sql<number>`
                    COUNT(*)
                `,
            })
            .from(surgeries)
            .where(sql`
                ${surgeries.doctorId} = ${doctorId}
                AND ${surgeries.surgeryDate}
                BETWEEN ${from} AND ${to}
            `);

        return result[0];
    }

    const result = await db
        .select({
            totalEarnings: sql<number>`
                COALESCE(SUM(${surgeries.earnings}),0)
            `,
            totalSurgeries: sql<number>`
                COUNT(*)
            `,
        })
        .from(surgeries)
        .where(eq(surgeries.doctorId, doctorId));

    return result[0];
}
    static async getHospitalReport(
        doctorId: number
    ) {

        return await db
            .select({
                hospitalId: hospitals.id,
                hospitalName: hospitals.name,
                surgeries: sql<number>`
                    COUNT(*)
                `,
                earnings: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
            })
            .from(surgeries)
            .innerJoin(
                hospitals,
                eq(surgeries.hospitalId, hospitals.id)
            )
            .where(eq(surgeries.doctorId, doctorId))
            .groupBy(
                hospitals.id,
                hospitals.name
            );
    }
}