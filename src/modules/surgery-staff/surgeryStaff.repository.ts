import { pool } from "../../db";

export class SurgeryStaffRepository {

  async create(data: any) {

    const [result]: any = await pool.query(
      `
      INSERT INTO surgery_staff_masters
      (
        doctor_id,
        staff_type,
        name,
        qualification,
        mobile
      )
      VALUES
      (?, ?, ?, ?, ?)
      `,
      [
        data.doctorId,
        data.staffType,
        data.name,
        data.qualification ?? null,
        data.mobile ?? null
      ]
    );

    return result.insertId;
  }

  async search(doctorId: number, keyword: string) {

    const searchKeyword = `%${keyword}%`;

    const [rows]: any = await pool.query(
      `
      SELECT
        id,
        doctor_id,
        staff_type,
        name,
        qualification,
        mobile,
        created_at
      FROM surgery_staff_masters
      WHERE doctor_id = ?
        AND (
          name LIKE ?
          OR mobile LIKE ?
          OR qualification LIKE ?
        )
      ORDER BY name ASC
      `,
      [
        doctorId,
        searchKeyword,
        searchKeyword,
        searchKeyword
      ]
    );

    return rows;
  }

  async list(doctorId: number) {

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM surgery_staff_masters
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
      SELECT
        id,
        doctor_id,
        staff_type,
        name,
        qualification,
        mobile,
        created_at
      FROM surgery_staff_masters
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
      SELECT
        id,
        doctor_id,
        staff_type,
        name,
        qualification,
        mobile,
        created_at
      FROM surgery_staff_masters
      WHERE id = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  async searchDropdown(
    doctorId: number,
    keyword: string
  ) {

    const [rows]: any = await pool.query(
      `
      SELECT
        id,
        name AS label,
        staff_type
      FROM surgery_staff_masters
      WHERE doctor_id = ?
        AND name LIKE ?
      ORDER BY name
      LIMIT 20
      `,
      [
        doctorId,
        `%${keyword}%`
      ]
    );

    return rows;
  }

  async update(id: number, data: any) {

    await pool.query(
      `
      UPDATE surgery_staff_masters
      SET
        staff_type = ?,
        name = ?,
        qualification = ?,
        mobile = ?
      WHERE id = ?
      `,
      [
        data.staffType,
        data.name,
        data.qualification ?? null,
        data.mobile ?? null,
        id
      ]
    );
  }

  async delete(id: number) {

    await pool.query(
      `
      DELETE FROM surgery_staff_masters
      WHERE id = ?
      `,
      [id]
    );
  }
  async listByStaffType(
    doctorId: number,
    staffType: number
) {

    const [rows]: any = await pool.query(
        `
        SELECT
            id,
            doctor_id,
            staff_type,
            name,
            qualification,
            mobile,
            created_at
        FROM surgery_staff_masters
        WHERE doctor_id = ?
          AND staff_type = ?
        ORDER BY name ASC
        `,
        [
            doctorId,
            staffType
        ]
    );

    return rows;
}
}