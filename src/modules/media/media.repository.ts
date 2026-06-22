import { db } from "../../db";
import { media } from "../../db/schema/media.schema";

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
}