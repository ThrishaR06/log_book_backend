import { DrainManagementMasterService } from "./drainManagement.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DrainManagementMasterController {

    static async create({ body, store }: any) {

    try {

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

    } catch (error: any) {

        console.error("CREATE DRAIN MANAGEMENT ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to create drain management master"
        );

    }

}

    static async getAll({ query, store }: any) {

    try {

        const result =
            await DrainManagementMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Drain management masters fetched successfully."
        );

    } catch (error: any) {

        console.error("GET ALL DRAIN MANAGEMENT ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to fetch drain management masters"
        );

    }

}

    static async search({ query, store }: any) {

    try {

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

    } catch (error: any) {

        console.error("SEARCH DRAIN MANAGEMENT ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to search drain management masters"
        );

    }

}

  static async update({ params, body, store }: any) {

    try {

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

    } catch (error: any) {

        console.error("UPDATE DRAIN MANAGEMENT ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to update drain management master"
        );

    }

}

    static async delete({ params, query, store }: any) {

    try {

        await DrainManagementMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Drain management master deleted successfully."
        );

    } catch (error: any) {

        console.error("DELETE DRAIN MANAGEMENT ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to delete drain management master"
        );

    }

}

}