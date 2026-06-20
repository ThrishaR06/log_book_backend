import { ClinicalDetailsService } from "./clinicalDetails.service";

export class ClinicalDetailsController {

  private service =
    new ClinicalDetailsService();

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

  update(
    surgeryId: number,
    body: any
  ) {
    return this.service.update(
      surgeryId,
      body
    );
  }
}