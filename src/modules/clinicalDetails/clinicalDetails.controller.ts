import { ClinicalDetailsService } from "./clinicalDetails.service";

export class ClinicalDetailsController {

    private service =
        new ClinicalDetailsService();

   async create({ body, store }: any) {

    try {

        return await this.service.create({
            ...body,
            doctorId: store.user.id,
        });

    } catch (error: any) {

        console.error("CREATE CLINICAL DETAILS ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to save clinical details.",
            data: null,
        };

    }

}

    async getBySurgeryId({ params, store }: any) {

    try {

        return await this.service.getBySurgeryId(
            Number(params.surgeryId),
            store.user.id
        );

    } catch (error: any) {

        console.error("GET CLINICAL DETAILS ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to fetch clinical details.",
            data: null,
        };

    }

}

    async update({ params, body, store }: any) {

    try {

        return await this.service.update(
            Number(params.surgeryId),
            store.user.id,
            body
        );

    } catch (error: any) {

        console.error("UPDATE CLINICAL DETAILS ERROR =", error);

        return {
            success: false,
            message: error.message || "Failed to update clinical details.",
            data: null,
        };

    }

}

}