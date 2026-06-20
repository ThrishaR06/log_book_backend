import { db } from "../../db";
import { surgeries } from "../../db/schema/surgeries";
import { subscriptions } from "../../db/schema/subscriptions";
import { hospitals } from "../../db/schema/hospitals";

import {
    eq,
    sql,
} from "drizzle-orm";

export class DashboardService {

    static async getDashboard(doctorId: number) {

        // Total surgeries
        const totalSurgeries = await db
            .select({
                count: sql<number>`COUNT(*)`,
            })
            .from(surgeries)
            .where(eq(surgeries.doctorId, doctorId));

        // Total earnings
        const totalEarnings = await db
            .select({
                total: sql<number>`COALESCE(SUM(${surgeries.earnings}),0)`,
            })
            .from(surgeries)
            .where(eq(surgeries.doctorId, doctorId));

        // Monthly surgeries
        const monthlySurgeries = await db
            .select({
                count: sql<number>`
                    COUNT(*)
                `,
            })
            .from(surgeries)
            .where(
                sql`
                    ${surgeries.doctorId} = ${doctorId}
                    AND MONTH(${surgeries.surgeryDate}) = MONTH(CURDATE())
                    AND YEAR(${surgeries.surgeryDate}) = YEAR(CURDATE())
                `
            );

        // Monthly earnings
        const monthlyEarnings = await db
            .select({
                total: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
            })
            .from(surgeries)
            .where(
                sql`
                    ${surgeries.doctorId} = ${doctorId}
                    AND MONTH(${surgeries.surgeryDate}) = MONTH(CURDATE())
                    AND YEAR(${surgeries.surgeryDate}) = YEAR(CURDATE())
                `
            );

        // Subscription
        const subscription = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.doctorId, doctorId));

        return {
            totalSurgeries: totalSurgeries[0].count,
            totalEarnings: totalEarnings[0].total,
            monthlySurgeries: monthlySurgeries[0].count,
            monthlyEarnings: monthlyEarnings[0].total,
            subscriptionPlan:
                subscription[0]?.plan || null,
            subscriptionStatus:
                subscription[0]?.status || null,
        };
    }

    static async getEarnings(doctorId: number) {

        const total = await db
            .select({
                amount: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
            })
            .from(surgeries)
            .where(eq(surgeries.doctorId, doctorId));

        const monthly = await db
            .select({
                amount: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
            })
            .from(surgeries)
            .where(
                sql`
                    ${surgeries.doctorId} = ${doctorId}
                    AND MONTH(${surgeries.surgeryDate}) = MONTH(CURDATE())
                    AND YEAR(${surgeries.surgeryDate}) = YEAR(CURDATE())
                `
            );

        const yearly = await db
            .select({
                amount: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
            })
            .from(surgeries)
            .where(
                sql`
                    ${surgeries.doctorId} = ${doctorId}
                    AND YEAR(${surgeries.surgeryDate}) = YEAR(CURDATE())
                `
            );

        return {
            total: total[0].amount,
            monthly: monthly[0].amount,
            yearly: yearly[0].amount,
        };
    }

    static async getEarningsByHospital(
        doctorId: number
    ) {

        return await db
            .select({
                hospitalId: hospitals.id,
                hospitalName: hospitals.name,
                earnings: sql<number>`
                    COALESCE(SUM(${surgeries.earnings}),0)
                `,
            })
            .from(surgeries)
            .innerJoin(
                hospitals,
                eq(
                    surgeries.hospitalId,
                    hospitals.id
                )
            )
            .where(eq(surgeries.doctorId, doctorId))
            .groupBy(
                hospitals.id,
                hospitals.name
            );
    }
}