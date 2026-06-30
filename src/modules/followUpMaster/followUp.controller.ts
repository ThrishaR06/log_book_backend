import { FollowUpMasterService } from "./followUp.service";
import { ApiResponse } from "../../utils/apiResponse";

export class FollowUpMasterController {

    static async create({ body, store }: any) {
    try {

        const result =
            await FollowUpMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                followUpInstruction: body.followUpInstruction,
            });

        return ApiResponse.success(
            result,
            "Follow-up master created successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP MASTER CREATE ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to create follow-up master."
        );

    }
}

   static async getAll({ query, store }: any) {
    try {

        const result =
            await FollowUpMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Follow-up masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP MASTER GET ALL ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch follow-up masters."
        );

    }
}

   static async search({ query, store }: any) {
    try {

        const result =
            await FollowUpMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Follow-up masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP MASTER SEARCH ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to search follow-up masters."
        );

    }
}
   static async update({ params, body, store }: any) {
    try {

        const result =
            await FollowUpMasterService.update(
                Number(params.id),
                store.user.id,
                body
            );

        return ApiResponse.success(
            result,
            "Follow-up master updated successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP MASTER UPDATE ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to update follow-up master."
        );

    }
}

   static async delete({ params, query, store }: any) {
    try {

        await FollowUpMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Follow-up master deleted successfully."
        );

    } catch (error: any) {

        console.error(
            "FOLLOW UP MASTER DELETE ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to delete follow-up master."
        );

    }
}
}