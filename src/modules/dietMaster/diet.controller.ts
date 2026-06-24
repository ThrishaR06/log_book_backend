import { DietMasterService } from "./diet.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DietMasterController {

    static async create({ body, store }: any) {

        const result =
            await DietMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                dietInstruction: body.dietInstruction,
            });

        return ApiResponse.success(
            result,
            "Diet master created successfully."
        );

    }

    static async getAll({ query, store }: any) {

        const result =
            await DietMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Diet masters fetched successfully."
        );

    }

    static async search({ query, store }: any) {

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

    }

    static async update({ params, body, store }: any) {

        await DietMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            null,
            "Diet master updated successfully."
        );

    }

    static async delete({ params, query, store }: any) {

        await DietMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Diet master deleted successfully."
        );

    }

}