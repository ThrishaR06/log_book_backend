import { BusinessSettingService } from "./businessSetting.service";
import { ApiResponse } from "../../utils/apiResponse";

export class BusinessSettingController {

    // ==========================
    // SAVE (CREATE / UPDATE)
    // ==========================
    static async save({ body, store }: any) {

        try {

            // At least one field should be provided
            if (
    !body.logo &&
    (!body.color || body.color.trim() === "")
) {

    return ApiResponse.error(
        "Please provide logo or color."
    );

}

            return await BusinessSettingService.save({
                doctorId: store.user.id,
                logo: body.logo,
                color: body.color,
            });

        } catch (error: any) {

            console.error(
                "SAVE BUSINESS SETTING ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to save business setting."
            );

        }

    }

    // ==========================
    // GET ALL
    // ==========================
    static async getAll({ store }: any) {

        try {

            return await BusinessSettingService.getAll({
                doctorId: store.user.id,
            });

        } catch (error: any) {

            console.error(
                "GET BUSINESS SETTINGS ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to fetch business settings."
            );

        }

    }

}