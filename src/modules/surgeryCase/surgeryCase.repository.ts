import { pool } from "../../db";
import { db } from "../../db";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { media } from "../../db/schema/media.schema";
import { eq, and, like, desc, sql } from "drizzle-orm";
import { MediaRepository } from "../media/media.repository";

export class SurgeryCaseRepository {

    private mediaRepository = new MediaRepository();

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

async getAllByDoctorId(
    doctorId: number,
    page: number,
    limit: number,
    filters: any
) {

    const offset = (page - 1) * limit;

    let query = `
        SELECT *
        FROM operative_records
        WHERE doctor_id = ?
    `;

    const values: any[] = [doctorId];

    if (filters.patientName) {
        query += ` AND patient_name LIKE ?`;
        values.push(`%${filters.patientName}%`);
    }

    if (filters.hospital) {
        query += ` AND hospital LIKE ?`;
        values.push(`%${filters.hospital}%`);
    }

    if (filters.caseNumber) {
        query += ` AND case_number LIKE ?`;
        values.push(`%${filters.caseNumber}%`);
    }

    if (filters.caseDate) {
        query += ` AND case_date = ?`;
        values.push(filters.caseDate);
    }

    // Count Query
    let countQuery = `
        SELECT COUNT(*) AS total
        FROM operative_records
        WHERE doctor_id = ?
    `;

    const countValues: any[] = [doctorId];

    if (filters.patientName) {
        countQuery += ` AND patient_name LIKE ?`;
        countValues.push(`%${filters.patientName}%`);
    }

    if (filters.hospital) {
        countQuery += ` AND hospital LIKE ?`;
        countValues.push(`%${filters.hospital}%`);
    }

    if (filters.caseNumber) {
        countQuery += ` AND case_number LIKE ?`;
        countValues.push(`%${filters.caseNumber}%`);
    }

    if (filters.caseDate) {
        countQuery += ` AND case_date = ?`;
        countValues.push(filters.caseDate);
    }

    query += `
        ORDER BY created_at DESC
        LIMIT ?
        OFFSET ?
    `;

    values.push(limit);
    values.push(offset);

    const [rows]: any = await pool.query(query, values);

    const [countRows]: any = await pool.query(
        countQuery,
        countValues
    );

    const total = Number(countRows[0].total);

    const totalPages = Math.ceil(total / limit);

    const data = rows.map((row: any) => {

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

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
        },
    };
}

async update(id: number, data: any) {

    console.log("========== REPOSITORY UPDATE ==========");
    console.log("ID =", id);
    console.dir(data, { depth: null });

    const existing = await db.query.surgeryCases.findFirst({
        where: (table, { eq }) => eq(table.surgeryId, id),
    });

    if (!existing) {
        throw new Error("Surgery case not found");
    }

    await db.transaction(async (tx) => {

        //--------------------------------------------------
        // PRE OP
        //--------------------------------------------------

        if (data.preOpImages) {

            const ids: number[] = [];

            for (const image of data.preOpImages) {

    // Existing image URL - keep it
    if (typeof image === "string") {
        ids.push(image as any);
        continue;
    }

    // Existing media id - keep it
    if (typeof image === "number") {
        ids.push(image);
        continue;
    }

    // New uploaded image
    const mediaRow = await this.mediaRepository.create({

        fileName: image.fileName,

        s3Key: image.key,

        mimeType: image.mimeType,

        surgeryCaseId: id,

        mediaType: "PRE_OP",

        size: 1,

        isPublic: false,

        uploadedBy: existing.doctorId,

    });

    ids.push(mediaRow.id);
}

data.preOpImages = ids;

            }

        //--------------------------------------------------
        // INTRA OP
        //--------------------------------------------------

        if (data.intraOpImages) {

            const ids: number[] = [];

            for (const image of data.intraOpImages) {

    if (typeof image === "string") {
        ids.push(image as any);
        continue;
    }

    if (typeof image === "number") {
        ids.push(image);
        continue;
    }

    const mediaRow = await this.mediaRepository.create({

        fileName: image.fileName,

        s3Key: image.key,

        mimeType: image.mimeType,

        surgeryCaseId: id,

        mediaType: "INTRA_OP",

        size: 1,

        isPublic: false,

        uploadedBy: existing.doctorId,

    });

    ids.push(mediaRow.id);
}

data.intraOpImages = ids;

            }

        //--------------------------------------------------
        // POST OP
        //--------------------------------------------------

        if (data.postOpImages) {

            const ids: number[] = [];

           for (const image of data.postOpImages) {

    if (typeof image === "string") {
        ids.push(image as any);
        continue;
    }

    if (typeof image === "number") {
        ids.push(image);
        continue;
    }

    const mediaRow = await this.mediaRepository.create({

        fileName: image.fileName,

        s3Key: image.key,

        mimeType: image.mimeType,

        surgeryCaseId: id,

        mediaType: "POST_OP",

        size: 1,

        isPublic: false,

        uploadedBy: existing.doctorId,

    });

    ids.push(mediaRow.id);
}

data.postOpImages = ids;
}

        //--------------------------------------------------
        // UPDATE SURGERY
        //--------------------------------------------------

        await tx
            .update(surgeryCases)
            .set(data)
            .where(eq(surgeryCases.surgeryId, id));

    });

    const record =
        await db.query.surgeryCases.findFirst({

            where: (table, { eq }) =>
                eq(table.surgeryId, id),

            with: {
                media: true,
            },

        });

    return record;
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

    console.log("Searching surgery =", caseId);

    const [rows]: any = await pool.query(
        `
        SELECT
            d.id,
            d.full_name,
            oc.surgery_id
        FROM operative_records oc
        INNER JOIN doctors d
        ON d.id = oc.doctor_id
        WHERE oc.surgery_id = ?
        `,
        [caseId]
    );

    console.log(rows);

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
async getAllPdfData(doctorId: number) {
    return await db.query.surgeryCases.findMany({
        where: (sc, { eq }) => eq(sc.doctorId, doctorId),
        with: {
            media: true,
        },
    });
}

async getPdfData(id: number) {
    return await db.query.surgeryCases.findFirst({
        where: (sc, { eq }) => eq(sc.surgeryId, id),
        with: {
            media: true,
        },
    });
}

}