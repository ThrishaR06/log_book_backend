import { SurgeryImagesRepository }
from "./surgeryImages.repository";

export class SurgeryImagesService {

  private repository =
  new SurgeryImagesRepository();

  async create(data: any) {

    const id =
    await this.repository.create(data);

    return {
      success: true,
      message:
      "Image uploaded successfully",
      data: { id }
    };
  }

  async getBySurgeryId(
    surgeryId: number
  ) {

    return {
      success: true,
      message:
      "Images fetched successfully",
      data:
      await this.repository.findBySurgeryId(
        surgeryId
      )
    };
  }

  async delete(id: number) {

    await this.repository.delete(id);

    return {
      success: true,
      message:
      "Image deleted successfully"
    };
  }
}