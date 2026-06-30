import { WoundCareMasterService } from "./woundCare.service";
import { ApiResponse } from "../../utils/apiResponse";

export class WoundCareMasterController {

    static async create({ body, store }: any) {
    try {

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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to create wound care master."
        );
    }
}

    static async getAll({ query, store }: any) {
    try {

        const result =
            await WoundCareMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Wound care masters fetched successfully."
        );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to fetch wound care masters."
        );
    }
}

    static async search({ query, store }: any) {
    try {

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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to search wound care masters."
        );
    }
}

    static async update({ params, body, store }: any) {
    try {

        await WoundCareMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            null,
            "Wound care master updated successfully."
        );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to update wound care master."
        );
    }
}

    static async delete({ params, query, store }: any) {
    try {

        await WoundCareMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Wound care master deleted successfully."
        );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to delete wound care master."
        );
    }
}

}