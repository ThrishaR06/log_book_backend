import { DiagnosisMasterRepository } from "./diagnosisMaster.repository";
import { ApiResponse } from "../../utils/apiResponse";

export class DiagnosisMasterService {

    private repository = new DiagnosisMasterRepository();

    // ==========================
    // CREATE
    // ==========================
    async create(body: any) {

        try {

            const isValid =
                await this.repository.validateDoctorCategory(
                    body.categoryId
                );

            if (!isValid) {
                return ApiResponse.error(
                    "Category not found."
                );
            }

            const id =
                await this.repository.create(body);

            const data =
                await this.repository.findById(id);

            return ApiResponse.success(
                data,
                "Diagnosis master created successfully."
            );

        } catch (error) {

            console.error(
                "SERVICE CREATE DIAGNOSIS MASTER ERROR =",
                error
            );

            throw error;

        }

    }

    // ==========================
    // GET ALL
    // ==========================
    async getAll(data: any) {

        try {

            const isValid =
                await this.repository.validateDoctorCategory(
                    data.categoryId
                );

            if (!isValid) {
                return ApiResponse.error(
                    "Category not found."
                );
            }

            const result =
                await this.repository.findAll();

            return ApiResponse.success(
                result,
                "Diagnosis masters fetched successfully."
            );

        } catch (error) {

            console.error(
                "SERVICE GET DIAGNOSIS MASTER ERROR =",
                error
            );

            throw error;

        }

    }

    // ==========================
    // UPDATE
    // ==========================
    async update(
        id: number,
        body: any
    ) {

        try {

            const isValid =
                await this.repository.validateDoctorCategory(
                    body.categoryId
                );

            if (!isValid) {
                return ApiResponse.error(
                    "Category not found."
                );
            }

            await this.repository.update(
                id,
                body
            );

            const data =
                await this.repository.findById(id);

            return ApiResponse.success(
                data,
                "Diagnosis master updated successfully."
            );

        } catch (error) {

            console.error(
                "SERVICE UPDATE DIAGNOSIS MASTER ERROR =",
                error
            );

            throw error;

        }

    }

    // ==========================
    // DELETE
    // ==========================
    async delete(
        id: number,
        doctorId: number
    ) {

        try {

            const isOwner =
                await this.repository.validateDiagnosisOwner(
                    id,
                    doctorId
                );

            if (!isOwner) {

                return ApiResponse.error(
                    "Diagnosis not found."
                );

            }

            await this.repository.delete(id);

            return ApiResponse.success(
                null,
                "Diagnosis deleted successfully."
            );

        } catch (error) {

            console.error(
                "SERVICE DELETE DIAGNOSIS MASTER ERROR =",
                error
            );

            throw error;

        }

    }

    // ==========================
    // SEARCH
    // ==========================
    async search(data: any) {

        try {

            const isValid =
                await this.repository.validateDoctorCategory(
                    data.categoryId
                );

            if (!isValid) {
                return ApiResponse.error(
                    "Category not found."
                );
            }

            const result =
                await this.repository.search(
                    data.search
                );

            return ApiResponse.success(
                result,
                "Diagnosis masters fetched successfully."
            );

        } catch (error) {

            console.error(
                "SERVICE SEARCH DIAGNOSIS MASTER ERROR =",
                error
            );

            throw error;

        }

    }

}