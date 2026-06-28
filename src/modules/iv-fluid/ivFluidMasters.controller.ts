import { IvFluidMasterService } from "./ivFluid.service";
import { ApiResponse } from "../../utils/apiResponse";

export class IvFluidMasterController {

    static async create({ body, store }: any) {

        const result =
            await IvFluidMasterService.create({
    doctorId: store.user.id,
    categoryId: body.categoryId,
    fluidName: body.fluidName,
    defaultRate: body.defaultRate,
    notes: body.notes,
});

        return ApiResponse.success(
            result,
            "IV fluid master created successfully."
        );
    }

    static async getAll({ store, query }: any) {

        const result =
            await IvFluidMasterService.getAll(
    store.user.id,
    Number(query.categoryId)
);

        return ApiResponse.success(
            result,
            "IV fluid masters fetched successfully."
        );
    }

    static async search({ store, query }: any) {

        const result =
            await IvFluidMasterService.search(
    store.user.id,
    Number(query.categoryId),
    query.keyword
);

        return ApiResponse.success(
            result,
            "IV fluid masters fetched successfully."
        );
    }

    static async update({ params, body, store }: any) {

        await IvFluidMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            "IV fluid master updated successfully."
        );
    }

    static async delete({ params,store, query }: any)  {

        await IvFluidMasterService.delete(
    Number(params.id),
    store.user.id,
    Number(query.categoryId)
);

        return ApiResponse.success(
            null,
            "IV fluid master deleted successfully."
        );
    }
}