import { MonitoringMasterService } from "./monitoring.service";
import { ApiResponse } from "../../utils/apiResponse";

export class MonitoringMasterController {

    static async create({ body, store }: any) {

    try {

        const result =
            await MonitoringMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                monitoringInstruction: body.monitoringInstruction,
            });

        return ApiResponse.success(
            result,
            "Monitoring master created successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to create monitoring master."
        );

    }

}

    static async getAll({ query, store }: any) {

    try {

        const result =
            await MonitoringMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Monitoring masters fetched successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to fetch monitoring masters."
        );

    }

}

   static async search({ query, store }: any) {

    try {

        const result =
            await MonitoringMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Monitoring masters fetched successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to search monitoring masters."
        );

    }

}
    static async update({ params, body, store }: any) {

    try {

        const result = await MonitoringMasterService.update(
    Number(params.id),
    store.user.id,
    body
);

return ApiResponse.success(
    result,
    "Monitoring master updated successfully."
);
    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to update monitoring master."
        );

    }

}

    static async delete({ params, query, store }: any) {

    try {

        await MonitoringMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Monitoring master deleted successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to delete monitoring master."
        );

    }

}
}