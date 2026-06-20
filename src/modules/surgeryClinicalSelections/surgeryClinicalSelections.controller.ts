import { SurgeryClinicalSelectionsService }
from "./surgeryClinicalSelections.service";

export class SurgeryClinicalSelectionsController {

  private service =
    new SurgeryClinicalSelectionsService();

  create(body: any) {
    return this.service.create(body);
  }
}