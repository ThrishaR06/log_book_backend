import { pool } from "../../db";

export class SurgeryStaffRepository {

async create(data: any) {

  const [result]: any = await pool.query(
    `
    INSERT INTO surgery_staff_masters
    (
      doctor_id,
      staff_type_id,
      name,
      qualification,
      mobile
    )
    VALUES
    (?, ?, ?, ?, ?)
    `,
    [
      data.doctorId,
      data.staffTypeId,
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
      ssm.id,
      ssm.doctor_id,
      ssm.staff_type_id,
      sst.name AS staff_type_name,
      ssm.name,
      ssm.qualification,
      ssm.mobile,
      ssm.created_at
    FROM surgery_staff_masters ssm
    LEFT JOIN surgery_staff_types sst
      ON sst.id = ssm.staff_type_id
    WHERE ssm.doctor_id = ?
      AND (
        ssm.name LIKE ?
        OR ssm.mobile LIKE ?
        OR ssm.qualification LIKE ?
      )
    ORDER BY ssm.name ASC
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
    SELECT
      ssm.*,
      sst.name AS staff_type_name
    FROM surgery_staff_masters ssm
    LEFT JOIN surgery_staff_types sst
      ON sst.id = ssm.staff_type_id
    WHERE ssm.doctor_id = ?
    ORDER BY ssm.id DESC
    `,
    [doctorId]
  );

  return rows;
}

  async findAll(doctorId: number) {

    const [rows]: any = await pool.query(
      `
      SELECT
        ssm.id,
        ssm.doctor_id,
        ssm.staff_type_id,
        sst.name AS staff_type_name,
        ssm.name,
        ssm.qualification,
        ssm.mobile,
        ssm.created_at
      FROM surgery_staff_masters ssm
      LEFT JOIN surgery_staff_types sst
        ON sst.id = ssm.staff_type_id
      WHERE ssm.doctor_id = ?
      ORDER BY ssm.id DESC
      `,
      [doctorId]
    );

    return rows;
  }

  async findById(id: number) {

    const [rows]: any = await pool.query(
      `
      SELECT
        ssm.id,
        ssm.doctor_id,
        ssm.staff_type_id,
        sst.name AS staff_type_name,
        ssm.name,
        ssm.qualification,
        ssm.mobile,
        ssm.created_at
      FROM surgery_staff_masters ssm
      LEFT JOIN surgery_staff_types sst
        ON sst.id = ssm.staff_type_id
      WHERE ssm.id = ?
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
      ssm.id,
      ssm.name AS label,
      sst.name AS staffType
    FROM surgery_staff_masters ssm
    LEFT JOIN surgery_staff_types sst
      ON sst.id = ssm.staff_type_id
    WHERE ssm.doctor_id = ?
      AND ssm.name LIKE ?
    ORDER BY ssm.name
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
        staff_type_id = ?,
        name = ?,
        qualification = ?,
        mobile = ?
      WHERE id = ?
      `,
      [
        data.staffTypeId,
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
}