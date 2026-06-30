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

  async findById(
  id: number,
  doctorId: number
) {

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
    INNER JOIN categories mc
      ON mc.id = ofm.category_id
    WHERE ofm.id = ?
      AND mc.doctor_id = ?
    `,
    [
      id,
      doctorId
    ]
  );

  return rows[0] || null;
}

 async findAll(
  doctorId: number,
  categoryId: number
) {

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
    INNER JOIN categories mc
      ON mc.id = ofm.category_id
    WHERE mc.doctor_id = ?
      AND ofm.category_id = ?
    ORDER BY ofm.id DESC
    `,
    [
      doctorId,
      categoryId
    ]
  );

  return rows;
}

  async update(
  id: number,
  doctorId: number,
  data: any
) {

  await pool.query(
    `
    UPDATE operative_findings_master
    SET
      category_id = ?,
      instruction = ?
    WHERE id = ?
      AND category_id IN
      (
        SELECT id
        FROM categories
        WHERE doctor_id = ?
      )
    `,
    [
      data.categoryId,
      data.instruction,
      id,
      doctorId
    ]
  );
}

  async delete(
  id: number,
  doctorId: number
) {

  await pool.query(
    `
    DELETE FROM operative_findings_master
    WHERE id = ?
      AND category_id IN
      (
        SELECT id
        FROM categories
        WHERE doctor_id = ?
      )
    `,
    [
      id,
      doctorId
    ]
  );
}

  async search(
  keyword: string,
  doctorId: number,
  categoryId: number
) {

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
    INNER JOIN categories mc
      ON mc.id = ofm.category_id
    WHERE ofm.instruction LIKE ?
      AND mc.doctor_id = ?
      AND ofm.category_id = ?
    ORDER BY ofm.id DESC
    `,
    [
      `%${keyword}%`,
      doctorId,
      categoryId
    ]
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