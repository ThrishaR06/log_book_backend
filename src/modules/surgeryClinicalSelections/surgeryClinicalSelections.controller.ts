import { SurgeryClinicalSelectionsService }
from "./surgeryClinicalSelections.service";

export class SurgeryClinicalSelectionsController {

  private service =
    new SurgeryClinicalSelectionsService();

  create({ body, store }: any) {

    try {

        return this.service.create({
            ...body,
            doctorId: store.user.id
        });

    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to save clinical selections."
        };

    }

}

}
