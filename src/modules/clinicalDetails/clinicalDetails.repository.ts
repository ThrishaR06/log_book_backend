import { pool } from "../../db";

export class ClinicalDetailsRepository {

  async create(data: any) {

    const [result]: any = await pool.query(
      `
      INSERT INTO surgery_clinical_details
      (
        surgery_id,
        diagnosis,
        operative_findings,
        procedure_details,
        blood_loss,
        specimens,
        additional_notes
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.surgeryId,
        data.diagnosis,
        data.operativeFindings,
        data.procedureDetails,
        data.bloodLoss,
        data.specimens,
        data.additionalNotes
      ]
    );

    return result.insertId;
  }

  async findBySurgeryId(
    surgeryId: number
  ) {

    const [rows]: any = await pool.query(
      `
      SELECT *
      FROM surgery_clinical_details
      WHERE surgery_id = ?
      `,
      [surgeryId]
    );

    return rows[0];
  }

  async update(
    surgeryId: number,
    data: any
  ) {

    await pool.query(
      `
      UPDATE surgery_clinical_details
      SET
        diagnosis = ?,
        operative_findings = ?,
        procedure_details = ?,
        blood_loss = ?,
        specimens = ?,
        additional_notes = ?
      WHERE surgery_id = ?
      `,
      [
        data.diagnosis,
        data.operativeFindings,
        data.procedureDetails,
        data.bloodLoss,
        data.specimens,
        data.additionalNotes,
        surgeryId
      ]
    );
  }
}