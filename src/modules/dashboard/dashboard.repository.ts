import { db } from "../../db";
import { sql } from "drizzle-orm";

export class DashboardRepository {

    async getSummary(
        doctorId: number,
        filter: string
    ) {

        let dateCondition = sql``;

        switch (filter) {

            case "today":

                dateCondition =
                    sql`AND DATE(case_date)=CURDATE()`;

                break;

            case "week":

                dateCondition =
                    sql`AND YEARWEEK(case_date,1)=YEARWEEK(CURDATE(),1)`;

                break;

            case "month":

                dateCondition =
                    sql`
                    AND MONTH(case_date)=MONTH(CURDATE())
                    AND YEAR(case_date)=YEAR(CURDATE())
                `;

                break;

            case "year":

                dateCondition =
                    sql`
                    AND YEAR(case_date)=YEAR(CURDATE())
                `;

                break;

            default:

                dateCondition = sql``;
        }

        const result = await db.execute(sql`

            SELECT

            COUNT(*) AS totalCases,

            COALESCE(SUM(total_amount),0) AS totalEarnings,

            COALESCE(SUM(doctor_fee),0) AS doctorFee,

            COALESCE(SUM(assistant_fee),0) AS assistantFee,

            COALESCE(SUM(implant_fee),0) AS implantFee,

            (

                COALESCE(

                    SUM(

                        CASE

                            WHEN doctor_remarks='Paid'

                            THEN doctor_fee

                            ELSE 0

                        END

                    ),0

                )

                +

                COALESCE(

                    SUM(

                        CASE

                            WHEN assistant_remarks='Paid'

                            THEN assistant_fee

                            ELSE 0

                        END

                    ),0

                )

                +

                COALESCE(

                    SUM(

                        CASE

                            WHEN implant_received_from_hospital=1

                            THEN implant_fee

                            ELSE 0

                        END

                    ),0

                )

            )

            AS paidAmount

            FROM operative_records

            WHERE doctor_id=${doctorId}

            ${dateCondition}

        `);

        return (result as any)[0][0];
    }

    async getDashboardCards(
    doctorId: number
) {

    const result = await db.execute(sql`

        SELECT

        (
            SELECT COUNT(*)

            FROM operative_records

            WHERE doctor_id = ${doctorId}

            AND MONTH(case_date) = MONTH(CURDATE())

            AND YEAR(case_date) = YEAR(CURDATE())

        ) AS totalSurgeries,

        (
            SELECT COUNT(DISTINCT uhid_no)

            FROM operative_records

            WHERE doctor_id = ${doctorId}

        ) AS totalPatients,

        (
            SELECT COUNT(DISTINCT uhid_no)

            FROM operative_records

            WHERE doctor_id = ${doctorId}

            AND YEARWEEK(case_date,1)=YEARWEEK(CURDATE(),1)

        ) AS weeklyPatients

    `);

    return (result as any)[0][0];

}

async getWeeklyRevenue(
    doctorId: number
) {

    const result = await db.execute(sql`

        SELECT

            DAYOFWEEK(case_date) AS dayNumber,

            DAYNAME(case_date) AS day,

            COALESCE(SUM(total_amount),0) AS revenue

        FROM operative_records

        WHERE doctor_id = ${doctorId}

        AND YEARWEEK(case_date,1) = YEARWEEK(CURDATE(),1)

        GROUP BY DAYOFWEEK(case_date), DAYNAME(case_date)

        ORDER BY DAYOFWEEK(case_date)

    `);

    const rows = (result as any)[0];

    const weeklyData = [
        { day: "Sun", revenue: 0 },
        { day: "Mon", revenue: 0 },
        { day: "Tue", revenue: 0 },
        { day: "Wed", revenue: 0 },
        { day: "Thu", revenue: 0 },
        { day: "Fri", revenue: 0 },
        { day: "Sat", revenue: 0 }
    ];

    rows.forEach((item: any) => {

        const index = Number(item.dayNumber) - 1;

        weeklyData[index].revenue = Number(item.revenue);

    });

    return weeklyData;

}

    async getHospitals(doctorId: number) {

        const result = await db.execute(sql`

            SELECT DISTINCT hospital

            FROM operative_records

            WHERE doctor_id=${doctorId}

            AND hospital IS NOT NULL

            ORDER BY hospital

        `);

        return result[0];
    }

    async getEarnings(
        doctorId: number,
        filters: any
    ) {

        const conditions: any[] = [

            sql`doctor_id=${doctorId}`

        ];

        if (filters.hospital) {

            conditions.push(
                sql`hospital=${filters.hospital}`
            );
        }

        if (filters.search) {

            const keyword = `%${filters.search}%`;

            conditions.push(sql`
                (
                    patient_name LIKE ${keyword}

                    OR case_number LIKE ${keyword}

                    OR hospital LIKE ${keyword}

                    OR JSON_UNQUOTE(
                        JSON_EXTRACT(surgery_procedure, '$.procedureName')
                    ) LIKE ${keyword}

                    OR JSON_UNQUOTE(
                        JSON_EXTRACT(surgery_procedure, '$.sideName')
                    ) LIKE ${keyword}
                )
            `);
        }

        if (filters.fromDate) {

            conditions.push(
                sql`case_date>=${filters.fromDate}`
            );
        }

        if (filters.toDate) {

            conditions.push(
                sql`case_date<=${filters.toDate}`
            );
        }

        const page = Number(filters.page || 1);

        const limit = Number(filters.limit || 10);

        const offset = (page - 1) * limit;

        const result = await db.execute(sql`

            SELECT

            surgery_id,

            case_number,

            patient_name,

            age,

            sex,

            hospital,

            case_date,

            duration,

            surgery_procedure,

            doctor_fee,

            assistant_fee,

            implant_fee,

            total_amount

            FROM operative_records

            WHERE ${sql.join(conditions, sql` AND `)}

            ORDER BY case_date DESC

            LIMIT ${limit}

            OFFSET ${offset}

        `);

        const count = await db.execute<{ total: number }>(sql`

            SELECT COUNT(*) AS total

            FROM operative_records

            WHERE ${sql.join(conditions, sql` AND `)}

        `);

        const rows = (result as any)[0];

        return {

            data: rows,

            pagination: {

                page,

                limit,

                total: Number((count as any)[0].total)

            }

        };

    }

    async getExportData(
        doctorId: number,
        filters: any
    ) {

        const conditions: any[] = [

            sql`doctor_id = ${doctorId}`

        ];

        if (filters.hospital) {

            conditions.push(
                sql`hospital = ${filters.hospital}`
            );
        }

        if (filters.fromDate) {

            conditions.push(
                sql`case_date >= ${filters.fromDate}`
            );
        }

        if (filters.toDate) {

            conditions.push(
                sql`case_date <= ${filters.toDate}`
            );
        }

        const result = await db.execute(sql`

            SELECT

            case_number,

            case_date,

            patient_name,

            age,

            sex,

            diagnosis,

            hospital,

            duration,

            surgery_procedure,

            doctor_fee

            FROM operative_records

            WHERE ${sql.join(conditions, sql` AND `)}

            ORDER BY case_date DESC

        `);

        return (result as any)[0];
    }

}