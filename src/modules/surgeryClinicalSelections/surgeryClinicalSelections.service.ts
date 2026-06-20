import { SurgeryClinicalSelectionsRepository }
from "./surgeryClinicalSelections.repository";

export class SurgeryClinicalSelectionsService {

  private repository =
    new SurgeryClinicalSelectionsRepository();

  async create(data: any) {

    const id =
      await this.repository.create(data);

    return {
      success: true,
      message:
        "Clinical selections saved successfully",
      data: {
        id
      }
    };
  }
}