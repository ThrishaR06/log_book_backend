import { pool } from "../../db";

export class DiagnosisMasterRepository {

    async create(data: any) {

        const [result]: any = await pool.query(
            `
            INSERT INTO diagnosis_master
            (
                category_id,
                instruction
            )
            VALUES (?, ?)
            `,
            [
                data.categoryId,
                data.instruction,
            ]
        );

        return result.insertId;
    }

    async findById(id: number) {

        const [rows]: any = await pool.query(
            `
            SELECT
                dm.id,
                dm.category_id,
                c.name AS category_name,
                dm.instruction,
                dm.created_at,
                dm.updated_at
            FROM diagnosis_master dm
            INNER JOIN categories c
                ON c.id = dm.category_id
            WHERE dm.id = ?
            `,
            [id]
        );

        return rows[0];
    }

    async findAll() {

        const [rows]: any = await pool.query(
            `
            SELECT
                dm.id,
                dm.category_id,
                c.name AS category_name,
                dm.instruction,
                dm.created_at,
                dm.updated_at
            FROM diagnosis_master dm
            INNER JOIN categories c
                ON c.id = dm.category_id
            ORDER BY dm.id DESC
            `
        );

        return rows;
    }

    async update(
        id: number,
        data: any
    ) {

        await pool.query(
            `
            UPDATE diagnosis_master
            SET
                category_id = ?,
                instruction = ?
            WHERE id = ?
            `,
            [
                data.categoryId,
                data.instruction,
                id,
            ]
        );
    }

    async validateDiagnosisOwner(
        id: number,
        doctorId: number
    ) {

        const [rows]: any = await pool.query(
            `
            SELECT
                dm.id
            FROM diagnosis_master dm
            INNER JOIN categories c
                ON c.id = dm.category_id
            WHERE dm.id = ?
              AND c.doctor_id = ?
            LIMIT 1
            `,
            [
                id,
                doctorId,
            ]
        );

        return rows.length > 0;
    }

    async delete(id: number) {

        await pool.query(
            `
            DELETE FROM diagnosis_master
            WHERE id = ?
            `,
            [id]
        );
    }

    async search(keyword: string) {

        const [rows]: any = await pool.query(
            `
            SELECT
                dm.id,
                dm.category_id,
                c.name AS category_name,
                dm.instruction,
                dm.created_at,
                dm.updated_at
            FROM diagnosis_master dm
            INNER JOIN categories c
                ON c.id = dm.category_id
            WHERE dm.instruction LIKE ?
            ORDER BY dm.id DESC
            `,
            [`%${keyword}%`]
        );

        return rows;
    }

    async validateDoctorCategory(categoryId: number) {

        const [rows]: any = await pool.query(
            `
            SELECT
                id
            FROM categories
            WHERE id = ?
            LIMIT 1
            `,
            [categoryId]
        );

        return rows.length > 0;
    }

}