import { SurgeryFinanceService }
from "./surgeryFinance.service";

export class SurgeryFinanceController {

  private service =
    new SurgeryFinanceService();

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

  delete(
    surgeryId: number
  ) {
    return this.service.delete(
      surgeryId
    );
  }
}