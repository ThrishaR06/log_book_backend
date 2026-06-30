import { SurgeryCaseRepository } from "./surgeryCase.repository";
import { db } from "../../db";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { media as mediaTable } from "../../db/schema/media.schema";
import { eq, desc, and } from "drizzle-orm";
import { inArray } from "drizzle-orm";
import { redis } from "../../config/redis";
export class SurgeryCaseService {
  private repository = new SurgeryCaseRepository();

  // ===========================
  // VALIDATE AGE
  // ===========================
  private validateAge(age: number) {
    if (age == null) {
      return;
    }

    if (age < 0 || age > 120) {
      throw new Error("Age should be between 0 and 120.");
    }
  }

  // ===========================
  // VALIDATE BLOOD GROUP
  // ===========================
  private validateBloodGroup(bloodGroup: string) {
    if (!bloodGroup) {
      return;
    }

    const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    if (!validGroups.includes(bloodGroup)) {
      throw new Error("Invalid blood group.");
    }
  }

  // ===========================
  // VALIDATE DATE
  // ===========================
  private validateCaseDate(caseDate: string) {
    if (!caseDate) {
      return;
    }

    const selectedDate = new Date(caseDate);

    const today = new Date();

    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      throw new Error("Future case date is not allowed.");
    }
  }

  // ===========================
  // VALIDATE TIME
  // ===========================
  private validateTime(startTime: string, endTime: string) {
    if (!startTime || !endTime) {
      return;
    }

    if (startTime >= endTime) {
      throw new Error("End time should be greater than start time.");
    }
  }
  private async validateDuplicateCaseNumber(
    doctorId: number,
    caseNumber: string,
    surgeryId?: number,
  ) {
    if (!caseNumber) {
      return;
    }

    const records = await db
      .select()
      .from(surgeryCases)
      .where(
        and(
          eq(surgeryCases.doctorId, doctorId),
          eq(surgeryCases.caseNumber, caseNumber),
        ),
      );

    if (records.length === 0) {
      return;
    }

    if (surgeryId && records[0].surgeryId === surgeryId) {
      return;
    }

    throw new Error("Case Number already exists.");
  }

  async create(data: any) {
    try{
    console.log("CREATE PAYLOAD:", data);

    // VALIDATIONS

    this.validateAge(data.age);

    this.validateBloodGroup(data.bloodGroup);

    this.validateCaseDate(data.caseDate);

    this.validateTime(data.startTime, data.endTime);

    await this.validateDuplicateCaseNumber(data.doctorId, data.caseNumber);

    // ✅ NORMALIZE MEDIA
    const media = [
      ...(data.preOpImages || []).map((url: string) => ({
        url,
        mediaType: "PRE_OP",
      })),

      ...(data.intraOpImages || []).map((url: string) => ({
        url,
        mediaType: "INTRA_OP",
      })),

      ...(data.postOpImages || []).map((url: string) => ({
        url,
        mediaType: "POST_OP",
      })),
    ];

    console.log("NORMALIZED MEDIA:", media);

    return await db.transaction(async (tx) => {
      // STEP 1: CREATE SURGERY CASE
      const result = await tx
        .insert(surgeryCases)
        .values({
          doctorId: data.doctorId,

          patientName: data.patientName,
          age: data.age,
          sex: data.sex,
          uhidNo: data.uhidNo,
          bloodGroup: data.bloodGroup,
          hospital: data.hospital,

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

          operativeFindings: data.operativeFindings,
          procedureDetails: data.procedureDetails,
          diagnosis: data.diagnosis,

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

          doctorFee: data.doctorFee,
          doctorPaymentMode: data.doctorPaymentMode,
          doctorRemarks: data.doctorRemarks,

          assistantFee: data.assistantFee,
          assistantPaymentMode: data.assistantPaymentMode,
          assistantRemarks: data.assistantRemarks,

          implantFee: data.implantFee,
          implantPaymentMode: data.implantPaymentMode,
          implantDetails: data.implantDetails,

          implantPaidByHospital: data.implantPaidByHospital,
          implantReceivedFromHospital: data.implantReceivedFromHospital,

          totalAmount: data.totalAmount,
        })
        .$returningId();

      const caseId = Number(result[0]?.surgeryId || result[0]);

      console.log("CASE CREATED:", caseId);

      // STEP 2: INSERT MEDIA
      if (media.length > 0) {
        const mediaRows: (typeof mediaTable.$inferInsert)[] = media.map(
          (m: any) => ({
            fileName: m.url.split("/").pop() || "image.jpg",
            s3Key: m.url,
            mimeType: "image/jpeg",
            size: 1,
            isPublic: false,
            uploadedBy: 1,
            surgeryCaseId: caseId,
            mediaType: m.mediaType,
          }),
        );

        console.log("CASE ID:", caseId);
        console.log("MEDIA LENGTH:", media.length);
        console.log("MEDIA ROWS:", mediaRows);
        console.log("👉 MEDIA INSERT BLOCK ENTERED");

        const preOpIds: number[] = [];
        const intraOpIds: number[] = [];
        const postOpIds: number[] = [];

        for (const row of mediaRows) {
          const mediaResult = await tx
            .insert(mediaTable)
            .values(row)
            .$returningId();

          const mediaId = Number(mediaResult[0]?.id || mediaResult[0]);

          if (row.mediaType === "PRE_OP") {
            preOpIds.push(mediaId);
          }

          if (row.mediaType === "INTRA_OP") {
            intraOpIds.push(mediaId);
          }

          if (row.mediaType === "POST_OP") {
            postOpIds.push(mediaId);
          }
        }

        await tx
          .update(surgeryCases)
          .set({
            preOpImages: preOpIds,
            intraOpImages: intraOpIds,
            postOpImages: postOpIds,
          })
          .where(eq(surgeryCases.surgeryId, caseId));
      }

      // STEP 3: RETURN FULL DATA
      const surgeryCase = await tx.query.surgeryCases.findFirst({
        where: (sc, { eq }) => eq(sc.surgeryId, caseId),
        with: {
          media: true,
        },
      });

      return {
        success: true,
        message: "Surgery case created successfully",
        data: surgeryCase,
      };
    });
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to create surgery case."
    );

  }

}
  async getAllByDoctorId(doctorId: number) { try{
    return await db
      .select()
      .from(surgeryCases)
      .where(eq(surgeryCases.doctorId, doctorId));
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to get doctor in surgery case."
    );

  }

}

  async getById(id: number) { 
    try{
    const data = await db.query.surgeryCases.findFirst({
      where: (sc, { eq }) => eq(sc.surgeryId, id),
    });

    if (!data) {
      throw new Error("Surgery case not found");
    }

    const preOpIds = (data.preOpImages || []) as number[];
    const intraOpIds = (data.intraOpImages || []) as number[];
    const postOpIds = (data.postOpImages || []) as number[];

    const mediaIds = [...preOpIds, ...intraOpIds, ...postOpIds];

    const mediaRecords =
      mediaIds.length > 0
        ? await db.query.media.findMany({
            where: (m, { inArray }) => inArray(m.id, mediaIds),
          })
        : [];

    const mediaMap = new Map<number, string>();

    mediaRecords.forEach((m) => {
      mediaMap.set(m.id, this.buildS3Url(m.s3Key));
    });

    return {
      ...data,

      preOpImages: preOpIds.map((id) => mediaMap.get(id)),

      intraOpImages: intraOpIds.map((id) => mediaMap.get(id)),

      postOpImages: postOpIds.map((id) => mediaMap.get(id)),
    };
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to get surgery case."
    );

  }

}

  private buildS3Url(s3Key: string) {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
  }

  private formatResponse(data: any) {
    if (!data?.media) return data;

    return {
      ...data,
      preOpImages: data.media.filter((m: any) => m.mediaType === "PRE_OP"),
      intraOpImages: data.media.filter((m: any) => m.mediaType === "INTRA_OP"),
      postOpImages: data.media.filter((m: any) => m.mediaType === "POST_OP"),
    };
  }

  async update(id: number, data: any) {

    try{
    this.validateAge(Number(data.age));

    this.validateBloodGroup(data.bloodGroup);

    this.validateCaseDate(data.caseDate);

    this.validateTime(data.startTime, data.endTime);

    await this.validateDuplicateCaseNumber(data.doctorId, data.caseNumber, id);

    const existing = await db.query.surgeryCases.findFirst({
      where: (table, { eq }) => eq(table.surgeryId, id),
    });

    if (!existing) {
      throw new Error("Surgery case not found.");
    }

    const updateData: any = {};

    // Patient Details
    if (data.patientName !== undefined)
      updateData.patientName = data.patientName;

    if (data.age !== undefined) updateData.age = Number(data.age);

    if (data.sex !== undefined) updateData.sex = data.sex;

    if (data.uhidNo !== undefined) updateData.uhidNo = data.uhidNo;

    if (data.bloodGroup !== undefined) updateData.bloodGroup = data.bloodGroup;

    if (data.hospital !== undefined) updateData.hospital = data.hospital;

    // Case Details
    if (data.caseNumber !== undefined) updateData.caseNumber = data.caseNumber;

    if (data.caseDate !== undefined) updateData.caseDate = data.caseDate;

    if (data.startTime !== undefined) updateData.startTime = data.startTime;

    if (data.endTime !== undefined) updateData.endTime = data.endTime;

    if (data.duration !== undefined) updateData.duration = data.duration;

    if (data.surgeon !== undefined) updateData.surgeon = data.surgeon;

    // Foreign Keys
    if (data.anaesthesiaId !== undefined)
      updateData.anaesthesiaId = Number(data.anaesthesiaId);

    if (data.positionId !== undefined)
      updateData.positionId = Number(data.positionId);

    if (data.incisionId !== undefined)
      updateData.incisionId = Number(data.incisionId);

    // JSON Fields
    if (data.staffIds !== undefined)
      updateData.staffIds =
        typeof data.staffIds === "string"
          ? JSON.parse(data.staffIds)
          : data.staffIds;

    if (data.surgeryProcedure !== undefined)
      updateData.surgeryProcedure =
        typeof data.surgeryProcedure === "string"
          ? JSON.parse(data.surgeryProcedure)
          : data.surgeryProcedure;

    if (data.ivFluidIds !== undefined)
      updateData.ivFluidIds =
        typeof data.ivFluidIds === "string"
          ? JSON.parse(data.ivFluidIds)
          : data.ivFluidIds;

    if (data.medicationIds !== undefined)
      updateData.medicationIds =
        typeof data.medicationIds === "string"
          ? JSON.parse(data.medicationIds)
          : data.medicationIds;

    // Operative Details
    if (data.diagnosis !== undefined) updateData.diagnosis = data.diagnosis;

    if (data.operativeFindings !== undefined)
      updateData.operativeFindings = data.operativeFindings;

    if (data.procedureDetails !== undefined)
      updateData.procedureDetails = data.procedureDetails;

    if (data.bloodLoss !== undefined) updateData.bloodLoss = data.bloodLoss;

    if (data.specimens !== undefined) updateData.specimens = data.specimens;

    if (data.additionalNotes !== undefined)
      updateData.additionalNotes = data.additionalNotes;

    if (data.monitoring !== undefined) updateData.monitoring = data.monitoring;

    if (data.diet !== undefined) updateData.diet = data.diet;

    if (data.drainManagement !== undefined)
      updateData.drainManagement = data.drainManagement;

    if (data.woundCare !== undefined) updateData.woundCare = data.woundCare;

    if (data.specialInstructions !== undefined)
      updateData.specialInstructions = data.specialInstructions;

    if (data.followUp !== undefined) updateData.followUp = data.followUp;

    if (data.followUpImaging !== undefined)
      updateData.followUpImaging = data.followUpImaging;

    // Fees
    if (data.doctorFee !== undefined)
      updateData.doctorFee = Number(data.doctorFee);

    if (data.doctorPaymentMode !== undefined)
      updateData.doctorPaymentMode = data.doctorPaymentMode;

    if (data.doctorRemarks !== undefined)
      updateData.doctorRemarks = data.doctorRemarks;

    if (data.assistantFee !== undefined)
      updateData.assistantFee = Number(data.assistantFee);

    if (data.assistantPaymentMode !== undefined)
      updateData.assistantPaymentMode = data.assistantPaymentMode;

    if (data.assistantRemarks !== undefined)
      updateData.assistantRemarks = data.assistantRemarks;

    if (data.implantFee !== undefined)
      updateData.implantFee = Number(data.implantFee);

    if (data.implantPaymentMode !== undefined)
      updateData.implantPaymentMode = data.implantPaymentMode;

    if (data.implantDetails !== undefined)
      updateData.implantDetails = data.implantDetails;

    if (data.implantPaidByHospital !== undefined)
      updateData.implantPaidByHospital =
        data.implantPaidByHospital === true ||
        data.implantPaidByHospital === "true";

    if (data.implantReceivedFromHospital !== undefined)
      updateData.implantReceivedFromHospital =
        data.implantReceivedFromHospital === true ||
        data.implantReceivedFromHospital === "true";

    if (data.totalAmount !== undefined)
      updateData.totalAmount = Number(data.totalAmount);

    await db
      .update(surgeryCases)
      .set(updateData)
      .where(eq(surgeryCases.surgeryId, id));

    return {
      success: true,
      message: "Surgery case updated successfully",
      data: await this.getById(id),
    };
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to update surgery case."
    );

  }

}

  async delete(id: number) {
    try{
    const existing = await db.query.surgeryCases.findFirst({
      where: (table, { eq }) => eq(table.surgeryId, id),
    });

    if (!existing) {
      throw new Error("Surgery case not found.");
    }

    await db.delete(mediaTable).where(eq(mediaTable.surgeryCaseId, id));

    await db.delete(surgeryCases).where(eq(surgeryCases.surgeryId, id));

    return {
      success: true,
      message: "Deleted successfully",
    };
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to delete surgery case."
    );

  }

}

  async getDoctorInfoByCaseId(caseId: number) {
    try{
    return this.repository.getDoctorInfoByCaseId(caseId);
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to get surgery case."
    );

  }

}

  async getDoctorById(id: number) {
    try{
    return this.repository.getDoctorById(id);
  }catch (error: any) {

    throw new Error(
      error.message || "Failed to create surgery case."
    );

  }

}
}
