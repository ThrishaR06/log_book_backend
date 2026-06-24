import { SpecialInstructionMasterService } from "./specialInstruction.service";
import { ApiResponse } from "../../utils/apiResponse";

export class SpecialInstructionMasterController {

    static async create({ body, store }: any) {

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

    }

    static async getAll({ query, store }: any) {

        const result =
            await SpecialInstructionMasterService.getAll(
                store.user.id,
                Number(query.categoryId)
            );

        return ApiResponse.success(
            result,
            "Special instruction masters fetched successfully."
        );

    }

    static async search({ query, store }: any) {

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

    }

    static async update({ params, body, store }: any) {

        await SpecialInstructionMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

        return ApiResponse.success(
            null,
            "Special instruction master updated successfully."
        );

    }

    static async delete({ params, query, store }: any) {

        await SpecialInstructionMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

        return ApiResponse.success(
            null,
            "Special instruction master deleted successfully."
        );

    }

}