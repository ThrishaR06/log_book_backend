import { FollowUpImagingMasterService } from "./followUpImaging.service";
import { ApiResponse } from "../../utils/apiResponse";

export class FollowUpImagingMasterController {

    static async create({ body, store }: any) {
    try {

        const result =
            await FollowUpImagingMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                followUpImagingInstruction:
                    body.followUpImagingInstruction,
            });

        return ApiResponse.success(
            result,
            "Follow-up imaging master created successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP IMAGING CREATE ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to create follow-up imaging master."
        );

    }
}

    static async getAll({ query, store }: any) {
    try {

        const result =
            await FollowUpImagingMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Follow-up imaging masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP IMAGING GET ALL ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch follow-up imaging masters."
        );

    }
}

    static async search({ query, store }: any) {
    try {

        const result =
            await FollowUpImagingMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Follow-up imaging masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP IMAGING SEARCH ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to search follow-up imaging masters."
        );

    }
}

   static async update({ params, body, store }: any) {
    try {

        const result =
            await FollowUpImagingMasterService.update(
                Number(params.id),
                store.user.id,
                body
            );

        return ApiResponse.success(
            result,
            "Follow-up imaging master updated successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP IMAGING UPDATE ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to update follow-up imaging master."
        );

    }
}

   static async delete({ params, query, store }: any) {
    try {

        await FollowUpImagingMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Follow-up imaging master deleted successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP IMAGING DELETE ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to delete follow-up imaging master."
        );

    }
}

}