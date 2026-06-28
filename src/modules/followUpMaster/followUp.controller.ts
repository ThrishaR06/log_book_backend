import { FollowUpMasterService } from "./followUp.service";
import { ApiResponse } from "../../utils/apiResponse";

export class FollowUpMasterController {

    static async create({ body, store }: any) {

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

    }

    static async getAll({ query, store }: any) {

        const result =
            await FollowUpMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Follow-up masters fetched successfully."
        );

    }

    static async search({ query, store }: any) {

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

    }

    static async update({ params, body, store }: any) {

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

}

    static async delete({ params, query, store }: any) {

        await FollowUpMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Follow-up master deleted successfully."
        );

    }

}