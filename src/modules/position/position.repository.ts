import { pool } from "../../db";

export class PositionRepository {

async create(data: any) {

  const [result]: any = await pool.query(
    `
    INSERT INTO position_masters
    (
      doctor_id,
      category_id,
      position_name
    )
    VALUES
    (?, ?, ?)
    `,
    [
      data.doctorId,
      data.categoryId,
      data.positionName
    ]
  );

  return result.insertId;
}

  async findAll(doctorId: number) {

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM position_masters
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
      FROM position_masters
      WHERE id = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  async update(id: number, data: any) {

    await pool.query(
      `
      UPDATE position_masters
      SET
      position_name = ?
      WHERE id = ?
      `,
      [
        data.positionName,
        id
      ]
    );
  }

  async delete(id: number) {

    await pool.query(
      `
      DELETE FROM position_masters
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
      FROM position_masters
      WHERE doctor_id = ?
      AND position_name LIKE ?
      ORDER BY position_name
      `,
      [
        doctorId,
        `%${keyword}%`
      ]
    );

    return rows;
  }

  async list(
 doctorId:number,
 categoryId:number
){

 const [rows]:any = await pool.query(
 `
 SELECT
    pm.id,
    pm.position_name,
    pm.category_id,
    c.name as category_name
 FROM position_masters pm
 LEFT JOIN categories c
      ON c.id = pm.category_id
 WHERE pm.doctor_id = ?
 AND pm.category_id = ?
 ORDER BY pm.id DESC
 `,
 [
   doctorId,
   categoryId
 ]
 );

 return rows;
}
}