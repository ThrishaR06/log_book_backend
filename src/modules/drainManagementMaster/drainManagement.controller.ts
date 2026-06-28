import { DrainManagementMasterService } from "./drainManagement.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DrainManagementMasterController {

    static async create({ body, store }: any) {

        const result =
            await DrainManagementMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                drainInstruction: body.drainInstruction,
            });

        return ApiResponse.success(
            result,
            "Drain management master created successfully."
        );

    }

    static async getAll({ query, store }: any) {

        const result =
            await DrainManagementMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Drain management masters fetched successfully."
        );

    }

    static async search({ query, store }: any) {

        const result =
            await DrainManagementMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Drain management masters fetched successfully."
        );

    }

    static async update({ params, body, store }: any) {

    const result =
        await DrainManagementMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    return ApiResponse.success(
        result,
        "Drain management master updated successfully."
    );

}

    static async delete({ params, query, store }: any) {

        await DrainManagementMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Drain management master deleted successfully."
        );

    }

}