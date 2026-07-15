import { db } from "../../db";
import { sql } from "drizzle-orm";
import { doctors } from "../../db/schema/doctors";

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

            COALESCE(SUM(paid_by_hospital),0) AS paidByHospital,

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

        COALESCE(SUM(total_amount), 0) AS revenue

    FROM operative_records

    WHERE doctor_id = ${doctorId}

    AND case_date BETWEEN

        DATE_SUB(CURDATE(), INTERVAL DAYOFWEEK(CURDATE()) - 1 DAY)

        AND

        DATE_ADD(
            DATE_SUB(CURDATE(), INTERVAL DAYOFWEEK(CURDATE()) - 1 DAY),
            INTERVAL 6 DAY
        )

    GROUP BY DAYOFWEEK(case_date), DAYNAME(case_date)

    ORDER BY DAYOFWEEK(case_date)

`);

        const rows = (result as any)[0];

        console.log("Weekly Revenue SQL Rows:");
        console.log(JSON.stringify(rows, null, 2));

        const weeklyData = [
            { day: "Sun", revenue: 0 },
            { day: "Mon", revenue: 0 },
            { day: "Tue", revenue: 0 },
            { day: "Wed", revenue: 0 },
            { day: "Thu", revenue: 0 },
            { day: "Fri", revenue: 0 },
            { day: "Sat", revenue: 0 }
        ];

        const dayMap: Record<string, string> = {
            Sunday: "Sun",
            Monday: "Mon",
            Tuesday: "Tue",
            Wednesday: "Wed",
            Thursday: "Thu",
            Friday: "Fri",
            Saturday: "Sat",
        };

        rows.forEach((item: any) => {

            const day = dayMap[item.day];

            const record = weeklyData.find(
                x => x.day === day
            );

            if (record) {
                record.revenue = Number(item.revenue);
            }

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

     async getFinanceDetails(
    doctorId: number,
    filters: any
) {

    const conditions: any[] = [
        sql`doctor_id = ${doctorId}`
    ];

    switch (filters.filter) {

    case "today":

        conditions.push(
            sql`DATE(case_date) = CURDATE()`
        );

        break;

    case "week":

        conditions.push(
            sql`YEARWEEK(case_date,1) = YEARWEEK(CURDATE(),1)`
        );

        break;

    case "month":

        conditions.push(sql`
            MONTH(case_date) = MONTH(CURDATE())
            AND YEAR(case_date) = YEAR(CURDATE())
        `);

        break;

    case "year":

        conditions.push(sql`
            YEAR(case_date) = YEAR(CURDATE())
        `);

        break;

    case "all":
    default:
        break;

}

    // Hospital Filter
    if (filters.hospital) {
        conditions.push(
            sql`hospital = ${filters.hospital}`
        );
    }

    // Search Filter
    if (filters.search) {

        const keyword = `%${filters.search}%`;

        conditions.push(sql`
            (
                patient_name LIKE ${keyword}
                OR case_number LIKE ${keyword}
                OR hospital LIKE ${keyword}
            )
        `);
    }

    // Date Filter
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

    // Finance Type Filter
    switch (filters.type) {

        case "earnings":
            conditions.push(sql`paid_by_hospital > 0`);
            break;

        case "doctor":
            conditions.push(sql`doctor_fee > 0`);
            break;

        case "assistant":
            conditions.push(sql`assistant_fee > 0`);
            break;

        case "implant":
            conditions.push(sql`implant_fee > 0`);
            break;

        case "pending":
            conditions.push(sql`
                (
                    doctor_remarks != 'Paid'
                    OR assistant_remarks != 'Paid'
                    OR implant_received_from_hospital = 0
                )
            `);
            break;

        default:
            conditions.push(sql`paid_by_hospital > 0`);
    }

    const page = Number(filters.page || 1);
    const limit = Number(filters.limit || 10);
    const offset = (page - 1) * limit;

    // Dynamic SELECT column
    let financeColumn = sql``;
    let message = "";

    switch (filters.type) {

        case "earnings":

            financeColumn = sql`
                paid_by_hospital
            `;

            message = "Earnings";

            break;

        case "doctor":

            financeColumn = sql`
                doctor_fee
            `;

            message = "Doctor Fee";

            break;

        case "assistant":

            financeColumn = sql`
                assistant_fee
            `;

            message = "Assistant Fee";

            break;

        case "implant":

            financeColumn = sql`
                implant_fee
            `;

            message = "Implant Fee";

            break;

        case "pending":

            financeColumn = sql`
                (
                    total_amount
                    -
                    (
                        CASE
                            WHEN doctor_remarks = 'Paid'
                            THEN doctor_fee
                            ELSE 0
                        END

                        +

                        CASE
                            WHEN assistant_remarks = 'Paid'
                            THEN assistant_fee
                            ELSE 0
                        END

                        +

                        CASE
                            WHEN implant_received_from_hospital = 1
                            THEN implant_fee
                            ELSE 0
                        END
                    )
                ) AS pending_amount
            `;

            message = "Pending";

            break;

        default:

            financeColumn = sql`
                paid_by_hospital
            `;

            message = "Earnings";
    }

    const result = await db.execute(sql`

        SELECT

            surgery_id,

            case_number,

            patient_name,

            hospital,

            case_date,

            ${financeColumn}

        FROM operative_records

        WHERE ${sql.join(conditions, sql` AND `)}

        ORDER BY case_date DESC

        LIMIT ${limit}

        OFFSET ${offset}

    `);

    const count = await db.execute(sql`

        SELECT COUNT(*) AS total

        FROM operative_records

        WHERE ${sql.join(conditions, sql` AND `)}

    `);

    return {

        message,

        data: (result as any)[0],

        pagination: {

            page,

            limit,

            total: Number((count as any)[0][0].total)

        }

    };

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

            sql`o.doctor_id = ${doctorId}`

        ];

        if (filters.hospital) {

            conditions.push(
                sql`o.hospital = ${filters.hospital}`
            );

        }

        if (filters.fromDate) {

            conditions.push(
                sql`o.case_date >= ${filters.fromDate}`
            );

        }

        if (filters.toDate) {

            conditions.push(
                sql`o.case_date <= ${filters.toDate}`
            );

        }

        const result = await db.execute(sql`

        SELECT

            o.case_number,

            o.case_date,

            o.patient_name,

            o.age,

            o.sex,

            o.diagnosis,

            o.hospital,

            o.duration,

            o.doctor_fee,

            COALESCE(

                JSON_UNQUOTE(
                    JSON_EXTRACT(
                        o.surgery_procedure,
                        '$.procedureName'
                    )
                ),

                p.procedure_name

            ) AS procedureName

        FROM operative_records o

        LEFT JOIN procedure_note_templates p

        ON p.id = CAST(

            JSON_UNQUOTE(

                JSON_EXTRACT(
                    o.surgery_procedure,
                    '$.procedureId'
                )

            ) AS UNSIGNED

        )

        WHERE ${sql.join(conditions, sql` AND `)}

        ORDER BY o.case_date DESC

    `);

        return (result as any)[0];

    }

    async getDoctorName(doctorId: number) {

        const doctor = await db.query.doctors.findFirst({
            where: (d, { eq }) => eq(d.id, doctorId),
            columns: {
                fullName: true,
            },
        });

        return doctor;
    }

}