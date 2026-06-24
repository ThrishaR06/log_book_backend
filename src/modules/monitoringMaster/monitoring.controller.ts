import { MonitoringMasterService } from "./monitoring.service";
import { ApiResponse } from "../../utils/apiResponse";

export class MonitoringMasterController {

    static async create({ body, store }: any) {

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
    }

    static async getAll({ query, store }: any){

        const result =
            await MonitoringMasterService.getAll(
    store.user.id,
    Number(query.categoryId)
);

        return ApiResponse.success(
            result,
            "Monitoring masters fetched successfully."
        );
    }

    static async search({ query, store }: any) {

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
    }

    static async update({ params, body, store }: any) {

        await MonitoringMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            null,
            "Monitoring master updated successfully."
        );
    }

    static async delete({ params, query, store }: any) {

        await MonitoringMasterService.delete(
    Number(params.id),
    store.user.id,
    Number(query.categoryId)
);

        return ApiResponse.success(
            null,
            "Monitoring master deleted successfully."
        );
    }
}