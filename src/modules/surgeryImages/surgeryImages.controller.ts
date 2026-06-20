import { SurgeryImagesService }
from "./surgeryImages.service";

export class SurgeryImagesController {

  private service =
  new SurgeryImagesService();

  create(body: any) {
    return this.service.create(body);
  }

  getBySurgeryId(
    surgeryId: number
  ) {
    return this.service.getBySurgeryId(
      surgeryId
    );
  }

  delete(id: number) {
    return this.service.delete(id);
  }
}