import { MediaService } from "./media.service";
import { ApiResponse } from "../../utils/apiResponse";


export class MediaController {
  private service = new MediaService();

  async upload(req: any) {
    try {

        const file = req.file;
        const body = req.body;

        return await this.service.uploadMedia({
            file,
            surgeryCaseId: body.surgeryCaseId,
            uploadedBy: body.uploadedBy,
            mediaType: body.mediaType,
        });

    } catch (error: any) {

        return {
            success: false,
            message: error.message || "Failed to upload media",
        };

    }
}

 static async deleteMedia({ params, store }: any) {

        await new MediaService().deleteMedia(
            Number(params.id),
            store.user.id
        );

        return {
            success: true,
            message: "Image deleted successfully."
        };
    }
}