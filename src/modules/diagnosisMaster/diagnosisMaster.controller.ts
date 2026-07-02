import { DiagnosisMasterService } from "./diagnosisMaster.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DiagnosisMasterController {

    private service = new DiagnosisMasterService();

    // ==========================
    // CREATE
    // ==========================
    async create({ body, store }: any) {

        try {

            return await this.service.create({
                doctorId: store.user.id,
                categoryId: Number(body.categoryId),
                instruction: body.instruction,
            });

        } catch (error: any) {

            console.error(
                "CREATE DIAGNOSIS MASTER ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to create diagnosis master."
            );

        }

    }

    // ==========================
    // GET ALL
    // ==========================
    async getAll({ query, store }: any) {

        try {

            return await this.service.getAll({
                doctorId: store.user.id,
                categoryId: Number(query.categoryId),
            });

        } catch (error: any) {

            console.error(
                "GET DIAGNOSIS MASTER ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to fetch diagnosis masters."
            );

        }

    }

    // ==========================
    // UPDATE
    // ==========================
    async update(id: string, { body, store }: any) {

        try {

            return await this.service.update(
                Number(id),
                {
                    doctorId: store.user.id,
                    categoryId: Number(body.categoryId),
                    instruction: body.instruction,
                }
            );

        } catch (error: any) {

            console.error(
                "UPDATE DIAGNOSIS MASTER ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to update diagnosis master."
            );

        }

    }

    // ==========================
    // DELETE
    // ==========================
    async delete(id: string, doctorId: number) {

        try {

            return await this.service.delete(
                Number(id),
                doctorId
            );

        } catch (error: any) {

            console.error(
                "DELETE DIAGNOSIS MASTER ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to delete diagnosis master."
            );

        }

    }

    // ==========================
    // SEARCH
    // ==========================
    async search({ query, store }: any) {

        try {

            return await this.service.search({
    doctorId: store.user.id,
    categoryId: Number(query.categoryId),
    search: query.keyword,
});

        } catch (error: any) {

            console.error(
                "SEARCH DIAGNOSIS MASTER ERROR =",
                error
            );

            return ApiResponse.error(
                error.message || "Failed to search diagnosis masters."
            );

        }

    }

}