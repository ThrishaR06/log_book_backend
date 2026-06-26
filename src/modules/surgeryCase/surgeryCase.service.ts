import { SurgeryCaseRepository } from "./surgeryCase.repository";
import { db } from "../../db";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { media as mediaTable } from "../../db/schema/media.schema";
import { eq } from "drizzle-orm";
import { inArray } from "drizzle-orm";
import { surgeries } from "../../db/schema/surgeries";
export class SurgeryCaseService {
  private repository = new SurgeryCaseRepository();

  async create(data: any) {
    console.log("CREATE PAYLOAD:", data);

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

            surgeryId: data.surgeryId,

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

      const caseId = Number(result[0]?.id || result[0]);

      console.log("CASE CREATED:", caseId);

      // STEP 2: INSERT MEDIA
      if (media.length > 0) {

        const mediaRows: typeof mediaTable.$inferInsert[] = media.map((m: any) => ({
          fileName: m.url.split("/").pop() || "image.jpg",
          s3Key: m.url,
          mimeType: "image/jpeg",
          size: 1,
          isPublic: false,
          uploadedBy: 1,
          surgeryCaseId: caseId,
          mediaType: m.mediaType,
        }));

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

  const mediaId = Number(
    mediaResult[0]?.id || mediaResult[0]
  );

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
  .where(eq(surgeryCases.id, caseId));

        console.log("👉 MEDIA INSERT SUCCESS");
      }

      // STEP 3: RETURN FULL DATA
      const surgeryCase = await tx.query.surgeryCases.findFirst({
        where: (sc, { eq }) => eq(sc.id, caseId),
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
  }

  async getDoctorId(surgeryId: number) {
    return await this.repository.getDoctorIdBySurgeryId(surgeryId);
  }

  async getDoctorInfo(surgeryId: number) {
  return await this.repository.getDoctorInfoBySurgeryId(surgeryId);
}

  async getById(id: number) {

  const data = await db.query.surgeryCases.findFirst({
    where: (sc, { eq }) => eq(sc.id, id),
  });

  if (!data) {
    throw new Error("Surgery case not found");
  }

  const preOpIds = (data.preOpImages || []) as number[];
  const intraOpIds = (data.intraOpImages || []) as number[];
  const postOpIds = (data.postOpImages || []) as number[];

  const mediaIds = [
    ...preOpIds,
    ...intraOpIds,
    ...postOpIds,
  ];

  const mediaRecords =
    mediaIds.length > 0
      ? await db.query.media.findMany({
          where: (m, { inArray }) =>
            inArray(m.id, mediaIds),
        })
      : [];

  const mediaMap = new Map<number, string>();

  mediaRecords.forEach((m) => {
    mediaMap.set(
      m.id,
      this.buildS3Url(m.s3Key)
    );
  });

  return {
    ...data,

    preOpImages: preOpIds.map(
      (id) => mediaMap.get(id)
    ),

    intraOpImages: intraOpIds.map(
      (id) => mediaMap.get(id)
    ),

    postOpImages: postOpIds.map(
      (id) => mediaMap.get(id)
    ),
  };
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

 async getAllByDoctorId(doctorId:number){

return await db
.select()
.from(surgeryCases)
.innerJoin(
surgeries,
eq(surgeryCases.surgeryId,surgeries.id)
)
.where(eq(surgeries.doctorId,doctorId));

}

async update(id: number, data: any) {

  const updateData: any = {};

  // Patient Details
  if (data.patientName !== undefined)
    updateData.patientName = data.patientName;

  if (data.age !== undefined)
    updateData.age = Number(data.age);

  if (data.sex !== undefined)
    updateData.sex = data.sex;

  if (data.uhidNo !== undefined)
    updateData.uhidNo = data.uhidNo;

  if (data.bloodGroup !== undefined)
    updateData.bloodGroup = data.bloodGroup;

  // Case Details
  if (data.caseNumber !== undefined)
    updateData.caseNumber = data.caseNumber;

  if (data.caseDate !== undefined)
    updateData.caseDate = data.caseDate;

  if (data.startTime !== undefined)
    updateData.startTime = data.startTime;

  if (data.endTime !== undefined)
    updateData.endTime = data.endTime;

  if (data.duration !== undefined)
    updateData.duration = data.duration;

  if (data.surgeon !== undefined)
    updateData.surgeon = data.surgeon;

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
  if (data.diagnosis !== undefined)
    updateData.diagnosis = data.diagnosis;

  if (data.operativeFindings !== undefined)
    updateData.operativeFindings = data.operativeFindings;

  if (data.procedureDetails !== undefined)
    updateData.procedureDetails = data.procedureDetails;

  if (data.bloodLoss !== undefined)
    updateData.bloodLoss = data.bloodLoss;

  if (data.specimens !== undefined)
    updateData.specimens = data.specimens;

  if (data.additionalNotes !== undefined)
    updateData.additionalNotes = data.additionalNotes;

  if (data.monitoring !== undefined)
    updateData.monitoring = data.monitoring;

  if (data.diet !== undefined)
    updateData.diet = data.diet;

  if (data.drainManagement !== undefined)
    updateData.drainManagement = data.drainManagement;

  if (data.woundCare !== undefined)
    updateData.woundCare = data.woundCare;

  if (data.specialInstructions !== undefined)
    updateData.specialInstructions = data.specialInstructions;

  if (data.followUp !== undefined)
    updateData.followUp = data.followUp;

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
    .where(eq(surgeryCases.id, id));

  return {
    success: true,
    message: "Surgery case updated successfully",
    data: await this.getById(id),
  };
}

async delete(id:number){

await db
.delete(mediaTable)
.where(eq(mediaTable.surgeryCaseId,id));

await db
.delete(surgeryCases)
.where(eq(surgeryCases.id,id));

return{
success:true,
message:"Deleted successfully"
};

}

async getDoctorInfoByCaseId(caseId:number){

    return this.repository.getDoctorInfoByCaseId(caseId);

}

}