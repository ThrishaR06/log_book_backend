import { ClinicalPresetsService } from "./clinicalPresets.service";
import { ApiResponse } from "../../utils/apiResponse";

export class ClinicalPresetsController {

    static async getAll({ store, query }: any) {

        try {

            const result =
                await ClinicalPresetsService.getAll(
                    store.user.id,
                    Number(query.categoryId)
                );

            return ApiResponse.success(
                result,
                "Clinical presets fetched successfully."
            );

        } catch (error: any) {

            console.error(
                "GET CLINICAL PRESETS ERROR =",
                error
            );

            return ApiResponse.error(
                error.message ||
                "Failed to fetch clinical presets."
            );

        }

    }

}