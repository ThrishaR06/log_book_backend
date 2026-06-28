import { FollowUpImagingMasterService } from "./followUpImaging.service";
import { ApiResponse } from "../../utils/apiResponse";

export class FollowUpImagingMasterController {

    static async create({ body, store }: any) {

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

    }

    static async getAll({ query, store }: any) {

        const result =
            await FollowUpImagingMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Follow-up imaging masters fetched successfully."
        );

    }

    static async search({ query, store }: any) {

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

    }

    static async update({ params, body, store }: any) {

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

}

    static async delete({ params, query, store }: any) {

        await FollowUpImagingMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Follow-up imaging master deleted successfully."
        );

    }

}