import { db } from "../../db";
import { media } from "../../db/schema/media.schema";
import { eq } from "drizzle-orm";
import { surgeryCases } from "../../db/schema/surgeryCases";
import { deleteFromS3 } from "../../utils/deleteFromS3";

export class MediaRepository {

  async create(data: any) {
    const [result] = await db.insert(media).values(data).$returningId();
    return result;
  }

  async findBySurgeryCaseId(surgeryCaseId: number) {
    return db.query.media.findMany({
      where: (m, { eq }) => eq(m.surgeryCaseId, surgeryCaseId),
    });
  }

  async findById(id: number) {
    return await db.query.media.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });
  }

  async deleteMedia(mediaId: number, doctorId: number) {

    //----------------------------------------
    // 1. Find media
    //----------------------------------------
    const mediaRecord = await this.findById(mediaId);

    if (!mediaRecord) {
      throw new Error("Image not found");
    }

    //----------------------------------------
    // 2. Find surgery (FIXED - single object)
    //----------------------------------------
    const surgery = await db
      .select()
      .from(surgeryCases)
      .where(eq(surgeryCases.surgeryId, mediaRecord.surgeryCaseId))
      .limit(1)
      .then(res => res[0]); // ✅ FIX: convert array → object

    if (!surgery) {
      throw new Error("Surgery case not found");
    }

    //----------------------------------------
    // 3. Ownership validation
    //----------------------------------------
    if (surgery.doctorId !== doctorId) {
      throw new Error("Unauthorized");
    }

    //----------------------------------------
    // 4. Normalize arrays safely
    //----------------------------------------
    let pre: number[] =
      Array.isArray(surgery.preOpImages)
        ? (surgery.preOpImages as number[])
        : [];

    let intra: number[] =
      Array.isArray(surgery.intraOpImages)
        ? (surgery.intraOpImages as number[])
        : [];

    let post: number[] =
      Array.isArray(surgery.postOpImages)
        ? (surgery.postOpImages as number[])
        : [];

    //----------------------------------------
    // 5. Remove mediaId
    //----------------------------------------
    if (mediaRecord.mediaType === "PRE_OP") {
      pre = pre.filter((id) => id !== mediaId);
    }

    if (mediaRecord.mediaType === "INTRA_OP") {
      intra = intra.filter((id) => id !== mediaId);
    }

    if (mediaRecord.mediaType === "POST_OP") {
      post = post.filter((id) => id !== mediaId);
    }

    //----------------------------------------
    // 6. Transaction
    //----------------------------------------
    await db.transaction(async (tx) => {

      await deleteFromS3(mediaRecord.s3Key);

      await tx
        .update(surgeryCases)
        .set({
          preOpImages: pre,
          intraOpImages: intra,
          postOpImages: post,
        })
        .where(eq(surgeryCases.surgeryId, surgery.surgeryId));

      await tx
        .delete(media)
        .where(eq(media.id, mediaId));
    });

    return true;
  }
}