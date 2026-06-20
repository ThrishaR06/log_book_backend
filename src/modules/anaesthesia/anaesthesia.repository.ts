import { pool } from "../../db";

export class AnaesthesiaRepository {

 async create(data: any) {
  const [result]: any = await pool.query(
    `
    INSERT INTO anaesthesia_masters
    (
      doctor_id,
      anaesthesia_name
    )
    VALUES
    (?, ?)
    `,
    [
      data.doctorId,
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
  async list(doctorId: number) {
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
    SET anaesthesia_name = ?
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
  keyword: string
) {
  const [rows]: any = await pool.query(
    `
    SELECT *
    FROM anaesthesia_masters
    WHERE doctor_id = ?
      AND anaesthesia_name LIKE ?
    ORDER BY anaesthesia_name ASC
    `,
    [
      doctorId,
      `%${keyword}%`
    ]
  );

  return rows;
}
}