import { pool } from "../../db";

export class ProcedureDetailsRepository {

  async create(data: any) {

    const [result]: any = await pool.query(
      `
      INSERT INTO procedure_details_master
      (
        category_id,
        instruction
      )
      VALUES (?, ?)
      `,
      [
        data.categoryId,
        data.instruction
      ]
    );

    return result.insertId;
  }

  async findById(id: number) {

    const [rows]: any = await pool.query(
      `
      SELECT
        pdm.id,
        pdm.category_id,
        mc.name AS category_name,
        pdm.instruction,
        pdm.created_at,
        pdm.updated_at
      FROM procedure_details_master pdm
      INNER JOIN master_categories mc
        ON mc.id = pdm.category_id
      WHERE pdm.id = ?
      `,
      [id]
    );

    return rows[0];
  }

  async findAll() {

    const [rows]: any = await pool.query(
      `
      SELECT
        pdm.id,
        pdm.category_id,
        mc.name AS category_name,
        pdm.instruction,
        pdm.created_at,
        pdm.updated_at
      FROM procedure_details_master pdm
      INNER JOIN master_categories mc
        ON mc.id = pdm.category_id
      ORDER BY pdm.id DESC
      `
    );

    return rows;
  }

  async update(id: number, data: any) {

    await pool.query(
      `
      UPDATE procedure_details_master
      SET
        category_id = ?,
        instruction = ?
      WHERE id = ?
      `,
      [
        data.categoryId,
        data.instruction,
        id
      ]
    );
  }

  async delete(id: number) {

    await pool.query(
      `
      DELETE FROM procedure_details_master
      WHERE id = ?
      `,
      [id]
    );
  }

  async search(keyword: string) {

    const [rows]: any = await pool.query(
      `
      SELECT
        pdm.id,
        pdm.category_id,
        mc.name AS category_name,
        pdm.instruction,
        pdm.created_at,
        pdm.updated_at
      FROM procedure_details_master pdm
      INNER JOIN master_categories mc
        ON mc.id = pdm.category_id
      WHERE pdm.instruction LIKE ?
      ORDER BY pdm.id DESC
      `,
      [`%${keyword}%`]
    );

    return rows;
  }

  async validateDoctorCategory(
  doctorId: number,
  categoryId: number
) {

  const [rows]: any = await pool.query(
    `
    SELECT
      id
    FROM categories
    WHERE id = ?
      AND doctor_id = ?
    LIMIT 1
    `,
    [
      categoryId,
      doctorId
    ]
  );

  return rows.length > 0;
}

async validateDoctorProcedureDetails(
    id: number,
    doctorId: number
) {

    const [rows]: any = await pool.query(
        `
        SELECT
            pdm.id
        FROM procedure_details_master pdm
        INNER JOIN categories c
            ON c.id = pdm.category_id
        WHERE pdm.id = ?
        AND c.doctor_id = ?
        LIMIT 1
        `,
        [
            id,
            doctorId
        ]
    );

    return rows.length > 0;

}

}