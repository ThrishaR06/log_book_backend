import { SpecialInstructionMasterService } from "./specialInstruction.service";
import { ApiResponse } from "../../utils/apiResponse";

export class SpecialInstructionMasterController {

    static async create({ body, store }: any) {

    try {

        const result =
            await SpecialInstructionMasterService.create({
                doctorId: store.user.id,
                categoryId: body.categoryId,
                specialInstruction: body.specialInstruction,
            });

        return ApiResponse.success(
            result,
            "Special instruction master created successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to create special instruction."
        );

    }

}

  static async getAll({ query, store }: any) {

    try {

        const result =
            await SpecialInstructionMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Special instruction masters fetched successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to fetch special instructions."
        );

    }

}

   static async search({ query, store }: any) {

    try {

        const result =
            await SpecialInstructionMasterService.search(
                store.user.id,
                Number(query.categoryId),
                query.keyword
            );

        return ApiResponse.success(
            result,
            "Special instruction masters fetched successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to search special instructions."
        );

    }

}

   static async update({ params, body, store }: any) {

    try {

        await SpecialInstructionMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            null,
            "Special instruction master updated successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to update special instruction."
        );

    }

}

  static async delete({ params, query, store }: any) {

    try {

        await SpecialInstructionMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Special instruction master deleted successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to delete special instruction."
        );

    }

}

}