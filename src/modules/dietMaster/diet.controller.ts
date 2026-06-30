import { DietMasterService } from "./diet.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DietMasterController {

    static async create({ body, store }: any) {

    try {

        const result =
            await DietMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                dietInstruction: body.dietInstruction,
            });

        return ApiResponse.success(
            result,
        );

    } catch (error: any) {

        console.error(
            "CREATE DIET MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to create diet master."
        );

    }

}
    static async getAll({ query, store }: any) {

    try {

        const result =
            await DietMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Diet masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "GET DIET MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch diet masters."
        );

    }

}

    static async search({ query, store }: any) {

    try {

        const result =
            await DietMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Diet masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "SEARCH DIET MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to search diet masters."
        );

    }

}

    static async update({ params, body, store }: any) {

    try {

        const result =
            await DietMasterService.update(
                Number(params.id),
                store.user.id,
                body
            );

        return result;

    } catch (error: any) {

        console.error(
            "UPDATE DIET MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to update diet master."
        );

    }

}

    static async delete({ params, query, store }: any) {

    try {

        await DietMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Diet master deleted successfully."
        );

    } catch (error: any) {

        console.error(
            "DELETE DIET MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to delete diet master."
        );

    }

}

}