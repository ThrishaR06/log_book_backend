import { db } from "../../db";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { eq, sql, like, and, gte, lte } from "drizzle-orm";

export class DashboardRepository {

    async getSummary(
    doctorId: number,
    filter: string
) {

    let dateCondition = sql``;

    switch (filter) {

        case "today":

            dateCondition =
                sql`AND DATE(o.case_date)=CURDATE()`;

            break;

        case "week":

            dateCondition =
                sql`AND YEARWEEK(o.case_date,1)=YEARWEEK(CURDATE(),1)`;

            break;

        case "month":

            dateCondition =
                sql`
                AND MONTH(o.case_date)=MONTH(CURDATE())
                AND YEAR(o.case_date)=YEAR(CURDATE())
                `;

            break;

        case "year":

            dateCondition =
                sql`
                AND YEAR(o.case_date)=YEAR(CURDATE())
                `;

            break;

        default:

            dateCondition = sql``;
    }

    const result = await db.execute(sql`

        SELECT

        COUNT(*) AS totalCases,

        COALESCE(SUM(o.total_amount),0) AS totalEarnings,

        COALESCE(SUM(o.doctor_fee),0) AS doctorFee,

        COALESCE(SUM(o.assistant_fee),0) AS assistantFee,

        COALESCE(SUM(o.implant_fee),0) AS implantFee,

        (
            COALESCE(
                SUM(
                    CASE
                        WHEN o.doctor_remarks = 'Paid'
                        THEN o.doctor_fee
                        ELSE 0
                    END
                ),0
            )

            +

            COALESCE(
                SUM(
                    CASE
                        WHEN o.assistant_remarks = 'Paid'
                        THEN o.assistant_fee
                        ELSE 0
                    END
                ),0
            )

            +

            COALESCE(
                SUM(
                    CASE
                        WHEN o.implant_received_from_hospital = 1
                        THEN o.implant_fee
                        ELSE 0
                    END
                ),0
            )

        ) AS paidAmount

        FROM operative_records o

        INNER JOIN surgeries s
        ON s.id = o.surgery_id

        WHERE
        s.doctor_id = ${doctorId}

        ${dateCondition}

    `);

    return (result as any)[0][0];
}

    async getHospitals(doctorId:number){

        const result=await db.execute(sql`

            SELECT DISTINCT hospital

            FROM operative_records o

            INNER JOIN surgeries s

            ON s.id=o.surgery_id

            WHERE
    s.doctor_id=${doctorId}
    AND o.hospital IS NOT NULL

            ORDER BY hospital

        `);

        return result[0];
    }

    async getEarnings(
        doctorId:number,
        filters:any
    ){

        const conditions:any[]=[
            sql`s.doctor_id=${doctorId}`
        ];

        if(filters.hospital){

            conditions.push(
                sql`o.hospital=${filters.hospital}`
            );
        }

        if (filters.search) {

    const keyword = `%${filters.search}%`;

    conditions.push(sql`
        (
            o.patient_name LIKE ${keyword}

            OR o.case_number LIKE ${keyword}

            OR o.hospital LIKE ${keyword}

            OR JSON_UNQUOTE(
                JSON_EXTRACT(o.surgery_procedure, '$.procedureName')
            ) LIKE ${keyword}

            OR JSON_UNQUOTE(
                JSON_EXTRACT(o.surgery_procedure, '$.sideName')
            ) LIKE ${keyword}
        )
    `);
}

        if(filters.fromDate){

            conditions.push(
                sql`o.case_date>=${filters.fromDate}`
            );
        }

        if(filters.toDate){

            conditions.push(
                sql`o.case_date<=${filters.toDate}`
            );
        }

        const page=Number(filters.page||1);

        const limit=Number(filters.limit||10);

        const offset=(page-1)*limit;

        const result=await db.execute(sql`

        SELECT

o.id,

o.case_number,

o.patient_name,

o.age,

o.sex,

o.hospital,

o.case_date,

o.duration,

o.surgery_procedure,

o.doctor_fee,

o.assistant_fee,

o.implant_fee,

o.total_amount

        FROM operative_records o

        INNER JOIN surgeries s

        ON s.id=o.surgery_id

        WHERE ${sql.join(conditions,sql` AND `)}

        ORDER BY o.case_date DESC

        LIMIT ${limit}

        OFFSET ${offset}

        `);

        const count = await db.execute<{ total: number }>(sql`

SELECT COUNT(*) AS total

FROM operative_records o

INNER JOIN surgeries s

ON s.id = o.surgery_id

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
        sql`s.doctor_id = ${doctorId}`
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
        o.surgery_procedure,
        o.doctor_fee

        FROM operative_records o

        INNER JOIN surgeries s
        ON s.id = o.surgery_id

        WHERE ${sql.join(conditions, sql` AND `)}

        ORDER BY o.case_date DESC

    `);

    return (result as any)[0];
}

}