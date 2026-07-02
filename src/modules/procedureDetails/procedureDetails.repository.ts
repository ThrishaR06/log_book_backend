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

  async findById(
  id: number,
  doctorId: number
) {

  const [rows]: any = await pool.query(
    `
    SELECT
      pdm.id,
      pdm.category_id,
      c.name AS category_name,
      pdm.instruction,
      pdm.created_at,
      pdm.updated_at
    FROM procedure_details_master pdm
    INNER JOIN categories c
      ON c.id = pdm.category_id
    WHERE pdm.id = ?
      AND c.doctor_id = ?
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
      pdm.id,
      pdm.category_id,
      c.name AS category_name,
      pdm.instruction,
      pdm.created_at,
      pdm.updated_at
    FROM procedure_details_master pdm
    INNER JOIN categories c
      ON c.id = pdm.category_id
    WHERE c.doctor_id = ?
      AND pdm.category_id = ?
    ORDER BY pdm.id DESC
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
    UPDATE procedure_details_master
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
    DELETE FROM procedure_details_master
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
      pdm.id,
      pdm.category_id,
      c.name AS category_name,
      pdm.instruction,
      pdm.created_at,
      pdm.updated_at
    FROM procedure_details_master pdm
    INNER JOIN categories c
      ON c.id = pdm.category_id
    WHERE pdm.instruction LIKE ?
      AND c.doctor_id = ?
      AND pdm.category_id = ?
    ORDER BY pdm.id DESC
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