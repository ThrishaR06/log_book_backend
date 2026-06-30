import { MedicationService } from "./medication.service";
import { ApiResponse } from "../../utils/apiResponse";
export class MedicationController {

    // =========================
    // CREATE
    // =========================
    static async create({ body, store }: any) {

    try {

        return await MedicationService.create({
            medicationName: body.medicationName,
            route: body.route,
            frequency: body.frequency,
            doctorId: store.user.id,
            categoryId: body.categoryId,
        });

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to create medication master."
        );

    }

}

    // =========================
    // GET ALL (doctor + category)
    // =========================
    static async getAll({ store, query }: any) {

    try {

        return await MedicationService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to fetch medication masters."
        );

    }

}

    // =========================
    // SEARCH
    // =========================
    static async search({ query, store }: any) {

    try {

        return await MedicationService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to search medication masters."
        );

    }

}
    // =========================
    // UPDATE
    // =========================
    static async update({ params, body, store }: any) {

    try {

        return await MedicationService.update(
            Number(params.id),
            store.user.id,
            body
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to update medication master."
        );

    }

}

    // =========================
    // DELETE
    // =========================
    static async delete({ params, query, store }: any) {

    try {

        return await MedicationService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to delete medication master."
        );

    }

}

}