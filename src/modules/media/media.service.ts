import { MediaRepository } from "./media.repository";

export class MediaService {
  private repo = new MediaRepository();

  async uploadMedia(data: any) {

    try {

        // 1. Upload to S3 (placeholder)
        const s3Key = `uploads/${Date.now()}-${data.file.originalname}`;

        // 2. Normally call S3 SDK here
        const fileUrl = `https://s3-bucket/${s3Key}`;

        // 3. Save in DB
        return await this.repo.create({
            fileName: data.file.originalname,
            s3Key,
            mimeType: data.file.mimetype,
            size: data.file.size,
            isPublic: false,
            uploadedBy: data.uploadedBy,
            surgeryCaseId: data.surgeryCaseId,
            mediaType: data.mediaType,
        });

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to upload media"
        );

    }
}
}