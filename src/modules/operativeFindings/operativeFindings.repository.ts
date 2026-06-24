import { pool } from "../../db";

export class OperativeFindingsRepository {

  async create(data: any) {

    const [result]: any = await pool.query(
      `
      INSERT INTO operative_findings_master
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
        ofm.id,
        ofm.category_id,
        mc.name AS category_name,
        ofm.instruction,
        ofm.created_at,
        ofm.updated_at
      FROM operative_findings_master ofm
      INNER JOIN master_categories mc
        ON mc.id = ofm.category_id
      WHERE ofm.id = ?
      `,
      [id]
    );

    return rows[0];
  }

  async findAll() {

    const [rows]: any = await pool.query(
      `
      SELECT
        ofm.id,
        ofm.category_id,
        mc.name AS category_name,
        ofm.instruction,
        ofm.created_at,
        ofm.updated_at
      FROM operative_findings_master ofm
      INNER JOIN master_categories mc
        ON mc.id = ofm.category_id
      ORDER BY ofm.id DESC
      `
    );

    return rows;
  }

  async update(id: number, data: any) {

    await pool.query(
      `
      UPDATE operative_findings_master
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
      DELETE FROM operative_findings_master
      WHERE id = ?
      `,
      [id]
    );
  }

  async search(keyword: string) {

    const [rows]: any = await pool.query(
      `
      SELECT
        ofm.id,
        ofm.category_id,
        mc.name AS category_name,
        ofm.instruction,
        ofm.created_at,
        ofm.updated_at
      FROM operative_findings_master ofm
      INNER JOIN master_categories mc
        ON mc.id = ofm.category_id
      WHERE ofm.instruction LIKE ?
      ORDER BY ofm.id DESC
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