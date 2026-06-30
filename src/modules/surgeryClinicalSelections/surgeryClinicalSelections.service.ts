import { SurgeryClinicalSelectionsRepository }
from "./surgeryClinicalSelections.repository";

export class SurgeryClinicalSelectionsService {

  private repository =
    new SurgeryClinicalSelectionsRepository();

  async create(data: any) {

    try {

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

    } catch (error: any) {

        throw new Error(
            error.message ||
            "Failed to save clinical selections."
        );

    }

}
}