import { BloodLossMasterService } from "./bloodLossMaster.service";
import { ApiResponse } from "../../utils/apiResponse";

export class BloodLossMasterController {

    // ==========================
    // CREATE
    // ==========================
    static async create({ body, store }: any) {

    try {

        return await BloodLossMasterService.create({
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });

    } catch (error: any) {

        console.error("CREATE BLOOD LOSS MASTER ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to create blood loss master."
        );

    }

}

    // ==========================
    // GET ALL
    // ==========================
    static async getAll({ query, store }: any) {

    try {

        return await BloodLossMasterService.getAll({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
        });

    } catch (error: any) {

        console.error("GET BLOOD LOSS MASTERS ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to fetch blood loss masters."
        );

    }

}

    // ==========================
    // GET BY ID
    // ==========================
    static async getById({ params, store }: any) {

    try {

        return await BloodLossMasterService.getById({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    } catch (error: any) {

        console.error("GET BLOOD LOSS MASTER BY ID ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to fetch blood loss master."
        );

    }

}

    // ==========================
    // UPDATE
    // ==========================
    static async update({ params, body, store }: any) {

    try {

        return await BloodLossMasterService.update({
            id: Number(params.id),
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });

    } catch (error: any) {

        console.error("UPDATE BLOOD LOSS MASTER ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to update blood loss master."
        );

    }

}
    // ==========================
    // DELETE
    // ==========================
    static async delete({ params, store }: any) {

    try {

        return await BloodLossMasterService.delete({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    } catch (error: any) {

        console.error("DELETE BLOOD LOSS MASTER ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to delete blood loss master."
        );

    }

}

    // ==========================
    // SEARCH
    // ==========================
    static async search({ query, store }: any) {

    try {

        return await BloodLossMasterService.search({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
            search: query.search,
        });

    } catch (error: any) {

        console.error("SEARCH BLOOD LOSS MASTER ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to search blood loss master."
        );

    }

}
}