import { pool } from "../../db";

export class SurgeryCaseRepository {

  async create(data: any) {

    const [result]: any =
      await pool.query(
        `
        INSERT INTO surgery_cases
        (
          surgery_id,

          anaesthesia_id,
          position_id,
          incision_id,

          staff_ids,

          surgery_procedure,

          diagnosis,
          operative_findings,
          procedure_details,

          blood_loss,
          specimens,
          additional_notes,

          iv_fluid_ids,
          medication_ids,

          monitoring,
          diet,

          drain_management,
          wound_care,

          special_instructions,
          follow_up,
          follow_up_imaging,

          pre_op_images,
          intra_op_images,
          post_op_images,

          doctor_fee,
          doctor_payment_mode,
          doctor_remarks,

          assistant_fee,
          assistant_payment_mode,
          assistant_remarks,

          implant_fee,
          implant_payment_mode,
          implant_details,

          implant_paid_by_hospital,
          implant_received_from_hospital,

          total_amount
        )
        VALUES
        (
          ?,?,?,?,
          ?,?,
          ?,?,?,
          ?,?,?,
          ?,?,
          ?,?,
          ?,?,
          ?,?,?,
          ?,?,?,
          ?,?,?,
          ?,?,?,
          ?,?,?,
          ?,?,
          ?
        )
        `,
        [

          data.surgeryId,

          data.anaesthesiaId ?? null,
          data.positionId ?? null,
          data.incisionId ?? null,

          JSON.stringify(
            data.staffIds ?? []
          ),

          JSON.stringify(
            data.surgeryProcedure ?? {}
          ),

          data.diagnosis ?? null,
          data.operativeFindings ?? null,
          data.procedureDetails ?? null,

          data.bloodLoss ?? null,
          data.specimens ?? null,
          data.additionalNotes ?? null,

          JSON.stringify(
            data.ivFluidIds ?? []
          ),

          JSON.stringify(
            data.medicationIds ?? []
          ),

          data.monitoring ?? null,
          data.diet ?? null,

          data.drainManagement ?? null,
          data.woundCare ?? null,

          data.specialInstructions ?? null,
          data.followUp ?? null,
          data.followUpImaging ?? null,

          JSON.stringify(
            data.preOpImages ?? []
          ),

          JSON.stringify(
            data.intraOpImages ?? []
          ),

          JSON.stringify(
            data.postOpImages ?? []
          ),

          data.doctorFee ?? 0,
          data.doctorPaymentMode ?? null,
          data.doctorRemarks ?? null,

          data.assistantFee ?? 0,
          data.assistantPaymentMode ?? null,
          data.assistantRemarks ?? null,

          data.implantFee ?? 0,
          data.implantPaymentMode ?? null,
          data.implantDetails ?? null,

          data.implantPaidByHospital ?? false,
          data.implantReceivedFromHospital ?? false,

          data.totalAmount ?? 0
        ]
      );

    return result.insertId;
  }
  async getDoctorIdBySurgeryId(surgeryId: number) {

    const [rows]: any = await pool.query(
        `
        SELECT doctor_id
        FROM surgeries
        WHERE id = ?
        `,
        [surgeryId]
    );

    if (!rows.length) {
        throw new Error("Surgery not found");
    }

    return rows[0].doctor_id;
}

async findById(id: number) {

  const [rows]: any = await pool.query(
    `
    SELECT *
    FROM surgery_cases
    WHERE id = ?
    `,
    [id]
  );

  const row = rows[0];

  if (!row) return null;

  row.staff_ids =
    typeof row.staff_ids === "string"
      ? JSON.parse(row.staff_ids)
      : row.staff_ids;

  row.surgery_procedure =
    typeof row.surgery_procedure === "string"
      ? JSON.parse(row.surgery_procedure)
      : row.surgery_procedure;

  row.iv_fluid_ids =
    typeof row.iv_fluid_ids === "string"
      ? JSON.parse(row.iv_fluid_ids)
      : row.iv_fluid_ids;

  row.medication_ids =
    typeof row.medication_ids === "string"
      ? JSON.parse(row.medication_ids)
      : row.medication_ids;

  row.pre_op_images =
    typeof row.pre_op_images === "string"
      ? JSON.parse(row.pre_op_images)
      : row.pre_op_images;

  row.intra_op_images =
    typeof row.intra_op_images === "string"
      ? JSON.parse(row.intra_op_images)
      : row.intra_op_images;

  row.post_op_images =
    typeof row.post_op_images === "string"
      ? JSON.parse(row.post_op_images)
      : row.post_op_images;

  return row;
}
}