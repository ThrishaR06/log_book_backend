import { WoundCareMasterService } from "./woundCare.service";
import { ApiResponse } from "../../utils/apiResponse";

export class WoundCareMasterController {

    static async create({ body, store }: any) {

        const result =
            await WoundCareMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                woundInstruction: body.woundInstruction,
            });

        return ApiResponse.success(
            result,
            "Wound care master created successfully."
        );

    }

    static async getAll({ query, store }: any) {

        const result =
            await WoundCareMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Wound care masters fetched successfully."
        );

    }

    static async search({ query, store }: any) {

        const result =
            await WoundCareMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Wound care masters fetched successfully."
        );

    }

    static async update({ params, body, store }: any) {

        await WoundCareMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            null,
            "Wound care master updated successfully."
        );

    }

    static async delete({ params, query, store }: any) {

        await WoundCareMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Wound care master deleted successfully."
        );

    }

}