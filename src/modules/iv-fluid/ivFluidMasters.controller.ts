import { IvFluidMasterService } from "./ivFluid.service";
import { ApiResponse } from "../../utils/apiResponse";

export class IvFluidMasterController {

   static async create({ body, store }: any) {
    try {

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

    } catch (error: any) {
        return ApiResponse.error(
            error.message || "Failed to create IV fluid master."
        );
    }
}

    static async getAll({ store, query }: any) {
        try{

        const result =
            await IvFluidMasterService.getAll(
    store.user.id,
    Number(query.categoryId)
);

        return ApiResponse.success(
            result,
            "IV fluid masters fetched successfully."
        );
    } catch (error: any) {
        return ApiResponse.error(
            error.message || "Failed to get IV fluid master."
        );
    }
}

    static async search({ store, query }: any) {
        try{

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
    } catch (error: any) {
        return ApiResponse.error(
            error.message || "Failed to fetch IV fluid masters."
        );
    }
}

    static async update({ params, body, store }: any) {
        try{

        await IvFluidMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
           "Failed to search IV fluid masters."
        );
    } catch (error: any) {
        return ApiResponse.error(
            error.message || "Failed to update IV fluid master."
        );
    }
}

    static async delete({ params,store, query }: any)  {
        try{

        await IvFluidMasterService.delete(
    Number(params.id),
    store.user.id,
    Number(query.categoryId)
);

        return ApiResponse.success(
            null,
            "IV fluid master deleted successfully."
        );
    } catch (error: any) {
        return ApiResponse.error(
            error.message || "Failed to delete IV fluid master."
        );
    }
}
}