import { SurgeryCaseRepository } from "./surgeryCase.repository";
import { db } from "../../db";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { media as mediaTable } from "../../db/schema/media.schema";
import { eq } from "drizzle-orm";
import { inArray } from "drizzle-orm";
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
            anaesthesiaId: data.anaesthesiaId,
            positionId: data.positionId,
            incisionId: data.incisionId,

          staffIds: data.staffIds || [],
surgeryProcedure: data.surgeryProcedure || {},

operativeFindings: data.operativeFindings,
procedureDetails: data.procedureDetails,

bloodLoss: data.bloodLoss,
additionalNotes: data.additionalNotes,

ivFluidIds: data.ivFluidIds || [],
medicationIds: data.medicationIds || [],

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
}