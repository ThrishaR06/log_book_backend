import { pool } from "../../db";

export class AnaesthesiaRepository {

  async create(data: any) {

  // Verify category belongs to logged-in doctor
  const [category]: any = await pool.query(
    `
    SELECT id
    FROM categories
    WHERE id = ?
      AND doctor_id = ?
    LIMIT 1
    `,
    [
      data.categoryId,
      data.doctorId
    ]
  );

  if (category.length === 0) {
    throw new Error("Category not found.");
  }

  const [result]: any = await pool.query(
    `
    INSERT INTO anaesthesia_masters
    (
      doctor_id,
      category_id,
      anaesthesia_name
    )
    VALUES
    (?, ?, ?)
    `,
    [
      data.doctorId,
      data.categoryId,
      data.anaesthesiaName
    ]
  );

  const [rows]: any = await pool.query(
    `
    SELECT *
    FROM anaesthesia_masters
    WHERE id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}
  async list(
    doctorId: number,
    categoryId: number
  ) {

    // Verify category belongs to logged-in doctor
const [category]: any = await pool.query(
  `
  SELECT id
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

if (category.length === 0) {
  throw new Error("Category not found.");
}

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM anaesthesia_masters
      WHERE doctor_id = ?
        AND category_id = ?
      ORDER BY id DESC
      `,
      [doctorId, categoryId]
    );

    return rows;
  }

  async findAll(doctorId: number) {

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM anaesthesia_masters
      WHERE doctor_id = ?
      ORDER BY id DESC
      `,
      [doctorId]
    );

    return rows;
  }

  async findById(id: number) {

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM anaesthesia_masters
      WHERE id = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  async update(id: number, data: any) {

    await pool.query(
      `
      UPDATE anaesthesia_masters
      SET
        anaesthesia_name = ?
      WHERE id = ?
      `,
      [
        data.anaesthesiaName,
        id
      ]
    );
  }

  async delete(id: number) {

    await pool.query(
      `
      DELETE FROM anaesthesia_masters
      WHERE id = ?
      `,
      [id]
    );
  }

 async search(
  doctorId: number,
  categoryId: number,
  keyword: string
) {

  // Verify category belongs to logged-in doctor
  const [category]: any = await pool.query(
    `
    SELECT id
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

  if (category.length === 0) {
    throw new Error("Category not found.");
  }

  const [rows]: any = await pool.query(
    `
    SELECT *
    FROM anaesthesia_masters
    WHERE doctor_id = ?
      AND category_id = ?
      AND anaesthesia_name LIKE ?
    ORDER BY anaesthesia_name ASC
    `,
    [
      doctorId,
      categoryId,
      `%${keyword}%`
    ]
  );

  return rows;
}
}