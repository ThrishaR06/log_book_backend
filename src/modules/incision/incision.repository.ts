import { pool } from "../../db";

export class IncisionRepository {

  async create(data: any) {

const [result]: any = await pool.query(
  `
  INSERT INTO incision_masters
  (
    doctor_id,
    incision_name
  )
  VALUES
  (?, ?)
  `,
  [
    data.doctorId,
    data.incisionName
  ]
);

return {
    id: result.insertId,
    doctorId: data.doctorId,
    incisionName: data.incisionName
  };
}

  async findAll(doctorId: number) {

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM incision_masters
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
      FROM incision_masters
      WHERE id = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  async update(id: number, data: any) {

    await pool.query(
      `
      UPDATE incision_masters
      SET
        incision_name = ?
      WHERE id = ?
      `,
      [
        data.incisionName,
        id
      ]
    );
  }

  async delete(id: number) {

    await pool.query(
      `
      DELETE FROM incision_masters
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
      FROM incision_masters
      WHERE doctor_id = ?
      AND incision_name LIKE ?
      ORDER BY incision_name ASC
      `,
      [
        doctorId,
        `%${keyword}%`
      ]
    );

    return rows;
  }

  async list(doctorId: number) {

const [rows]: any = await pool.query(
  `
  SELECT *
  FROM incision_masters
  WHERE doctor_id = ?
  ORDER BY id DESC
  `,
  [doctorId]
);

return rows;
}

}