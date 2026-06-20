import { pool } from "../../db";

export class SurgeryFinanceRepository {

  async create(data: any) {

    const [result]: any =
      await pool.query(
        `
        INSERT INTO surgery_finance
        (
          surgery_id,

          doctor_fee,
          doctor_payment_mode,
          doctor_remarks,

          assistant_fee,
          assistant_payment_mode,
          assistant_remarks,

          implant_fee,
          implant_details,

          implant_paid_by_hospital,
          implant_received_from_hospital,

          total_amount
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          data.surgeryId,

          data.doctorFee,
          data.doctorPaymentMode,
          data.doctorRemarks ?? null,

          data.assistantFee,
          data.assistantPaymentMode,
          data.assistantRemarks ?? null,

          data.implantFee,
          data.implantDetails ?? null,

          data.implantPaidByHospital,
          data.implantReceivedFromHospital,

          data.totalAmount
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
        FROM surgery_finance
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
      UPDATE surgery_finance
      SET

        doctor_fee = ?,
        doctor_payment_mode = ?,
        doctor_remarks = ?,

        assistant_fee = ?,
        assistant_payment_mode = ?,
        assistant_remarks = ?,

        implant_fee = ?,
        implant_details = ?,

        implant_paid_by_hospital = ?,
        implant_received_from_hospital = ?,

        total_amount = ?

      WHERE surgery_id = ?
      `,
      [

        data.doctorFee,
        data.doctorPaymentMode,
        data.doctorRemarks ?? null,

        data.assistantFee,
        data.assistantPaymentMode,
        data.assistantRemarks ?? null,

        data.implantFee,
        data.implantDetails ?? null,

        data.implantPaidByHospital,
        data.implantReceivedFromHospital,

        data.totalAmount,

        surgeryId
      ]
    );
  }

  async delete(
    surgeryId: number
  ) {

    await pool.query(
      `
      DELETE FROM surgery_finance
      WHERE surgery_id = ?
      `,
      [surgeryId]
    );
  }
}