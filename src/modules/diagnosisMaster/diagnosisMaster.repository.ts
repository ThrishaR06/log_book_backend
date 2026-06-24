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
        data.instruction
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
        mc.name AS category_name,
        dm.instruction,
        dm.created_at,
        dm.updated_at
      FROM diagnosis_master dm
      INNER JOIN master_categories mc
        ON mc.id = dm.category_id
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
        mc.name AS category_name,
        dm.instruction,
        dm.created_at,
        dm.updated_at
      FROM diagnosis_master dm
      INNER JOIN master_categories mc
        ON mc.id = dm.category_id
      ORDER BY dm.id DESC
      `
    );

    return rows;
  }

  async update(id: number, data: any) {

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
        id
      ]
    );
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
        mc.name AS category_name,
        dm.instruction,
        dm.created_at,
        dm.updated_at
      FROM diagnosis_master dm
      INNER JOIN master_categories mc
        ON mc.id = dm.category_id
      WHERE dm.instruction LIKE ?
      ORDER BY dm.id DESC
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
}