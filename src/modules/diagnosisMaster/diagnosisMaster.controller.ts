import { DiagnosisMasterService }
from "./diagnosisMaster.service";

import { ApiResponse }
from "../../utils/apiResponse";

export class DiagnosisMasterController {

  private service =
    new DiagnosisMasterService();

  async create({ body, store }: any) {

    try {

        const result =
            await this.service.create({
                ...body,
                doctorId: store.user.id
            });

        return ApiResponse.success(
            result,
            "Diagnosis master created successfully."
        );

    } catch (error: any) {

        console.error(
            "CREATE DIAGNOSIS MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to create diagnosis master."
        );

    }
}

  async getAll({ query, store }: any) {

    try {

        const result =
            await this.service.getAll({
                doctorId: store.user.id,
                categoryId: Number(query.categoryId)
            });

        return ApiResponse.success(
            result,
            "Diagnosis masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "GET DIAGNOSIS MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch diagnosis masters."
        );

    }
}

  async update(
    id: string,
    { body, store }: any
) {

    try {

        const result =
            await this.service.update(
                Number(id),
                {
                    ...body,
                    doctorId: store.user.id
                }
            );

        return ApiResponse.success(
            result,
            "Diagnosis master updated successfully."
        );

    } catch (error: any) {

        console.error(
            "UPDATE DIAGNOSIS MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to update diagnosis master."
        );

    }
}

  async delete(
    id: string,
    doctorId: number
) {

    try {

        const result =
            await this.service.delete(
                Number(id),
                doctorId
            );

        return ApiResponse.success(
            result,
            "Diagnosis master deleted successfully."
        );

    } catch (error: any) {

        console.error(
            "DELETE DIAGNOSIS MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to delete diagnosis master."
        );

    }
}

  async search({ query, store }: any) {

    try {

        const result =
            await this.service.search({
                keyword: String(query.keyword || ""),
                doctorId: store.user.id,
                categoryId: Number(query.categoryId)
            });

        return ApiResponse.success(
            result,
            "Diagnosis masters fetched successfully."
        );

    } catch (error: any) {

        console.error(
            "SEARCH DIAGNOSIS MASTER ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to search diagnosis masters."
        );

    }
}
}