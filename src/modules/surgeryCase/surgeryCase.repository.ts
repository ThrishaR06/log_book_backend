import { pool } from "../../db";
import { db } from "../../db";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { media } from "../../db/schema/media.schema";
import { eq } from "drizzle-orm";

export class SurgeryCaseRepository {

  async create(data: any) {

    const [result]: any =
      await pool.query(
        `
        INSERT INTO operative_records
(
    doctor_id,

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
 ?,
 ?,?,?,
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
data.doctorId,

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
  

async findById(id: number) {

  const [rows]: any = await pool.query(
    `
    SELECT *
    FROM operative_records
    WHERE surgery_id = ?
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

async getAllByDoctorId(doctorId: number) {

  const [rows]: any = await pool.query(
`
SELECT *
FROM operative_records
WHERE doctor_id = ?
ORDER BY created_at DESC
`,
[doctorId]
);

  return rows.map((row: any) => {

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
  });
}

async update(
    id: number,
    data: any
) {

    await db
        .update(surgeryCases)
        .set({


            patientName: data.patientName,
            age: data.age,
            sex: data.sex,
            uhidNo: data.uhidNo,
            bloodGroup: data.bloodGroup,

            caseNumber: data.caseNumber,
            caseDate: data.caseDate,

            startTime: data.startTime,
            endTime: data.endTime,
            duration: data.duration,

            surgeon: data.surgeon,

            anaesthesiaId: data.anaesthesiaId,
            positionId: data.positionId,
            incisionId: data.incisionId,

            staffIds: data.staffIds || [],

            surgeryProcedure: data.surgeryProcedure || {},

            diagnosis: data.diagnosis,

            operativeFindings: data.operativeFindings,

            procedureDetails: data.procedureDetails,

            bloodLoss: data.bloodLoss,

            specimens: data.specimens,

            additionalNotes: data.additionalNotes,

            ivFluidIds: data.ivFluidIds || [],

            medicationIds: data.medicationIds || [],

            monitoring: data.monitoring,

            diet: data.diet,

            drainManagement: data.drainManagement,

            woundCare: data.woundCare,

            specialInstructions: data.specialInstructions,

            followUp: data.followUp,

            followUpImaging: data.followUpImaging,

            preOpImages: data.preOpImages || [],

            intraOpImages: data.intraOpImages || [],

            postOpImages: data.postOpImages || [],

            doctorFee: data.doctorFee,

            doctorPaymentMode: data.doctorPaymentMode,

            doctorRemarks: data.doctorRemarks,

            assistantFee: data.assistantFee,

            assistantPaymentMode: data.assistantPaymentMode,

            assistantRemarks: data.assistantRemarks,

            implantFee: data.implantFee,

            implantPaymentMode: data.implantPaymentMode,

            implantDetails: data.implantDetails,

            implantPaidByHospital:
                data.implantPaidByHospital,

            implantReceivedFromHospital:
                data.implantReceivedFromHospital,

            totalAmount: data.totalAmount,
        })
        .where(eq(surgeryCases.surgeryId, id));

    return await db.query.surgeryCases.findFirst({

        where: (sc, { eq }) =>
            eq(sc.surgeryId, id),

        with: {
            media: true,
        },
    });

}

async getDoctorById(id: number) {
    const [rows]: any = await pool.query(
        `
        SELECT
            id,
            full_name
        FROM doctors
        WHERE id = ?
        `,
        [id]
    );

    if (!rows.length) {
        throw new Error("Doctor not found");
    }

    return rows[0];
}
async getDoctorInfoByCaseId(caseId: number) {

  const [rows]: any = await pool.query(
`
SELECT
d.id,
d.full_name AS name,
oc.surgery_id AS surgeryId
FROM operative_records oc
INNER JOIN doctors d
ON d.id = oc.doctor_id
WHERE oc.surgery_id = ?
`,
[caseId]
);

  if (!rows.length) {
    throw new Error("Surgery case not found");
  }

  return rows[0];
}

async delete(id: number) {

    await db
        .delete(media)
        .where(
            eq(
                media.surgeryCaseId,
                id
            )
        );

    await db
        .delete(surgeryCases)
        .where(
            eq(
                surgeryCases.surgeryId,
                id
            )
        );

    return {
        success: true,
        message: "Surgery case deleted successfully"
    };

}
}