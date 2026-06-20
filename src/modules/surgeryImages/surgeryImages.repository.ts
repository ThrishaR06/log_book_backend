import { pool } from "../../db";

export class SurgeryImagesRepository {

  async create(data: any) {

    const [result]: any =
    await pool.query(
      `
      INSERT INTO surgery_images
      (
        surgery_id,
        image_type,
        file_url
      )
      VALUES
      (?, ?, ?)
      `,
      [
        data.surgeryId,
        data.imageType,
        data.fileUrl
      ]
    );

    return result.insertId;
  }

  async findBySurgeryId(
    surgeryId: number
  ) {

    const [rows]: any =
    await pool.query(
      `
      SELECT *
      FROM surgery_images
      WHERE surgery_id = ?
      ORDER BY id DESC
      `,
      [surgeryId]
    );

    return rows;
  }

  async delete(id: number) {

    await pool.query(
      `
      DELETE FROM surgery_images
      WHERE id = ?
      `,
      [id]
    );
  }
}