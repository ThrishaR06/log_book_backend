import { DiagnosisMasterRepository }from "./diagnosisMaster.repository";

export class DiagnosisMasterService {

  private repository =
    new DiagnosisMasterRepository();

  async create(body: any) {

    try {

        const isValid =
            await this.repository.validateDoctorCategory(
                body.doctorId,
                body.categoryId
            );

        if (!isValid) {
            return {
                success: false,
                message: "Category not found."
            };
        }

        const id =
            await this.repository.create(body);

        return this.repository.findById(id);

    } catch (error) {

        console.error(
            "SERVICE CREATE DIAGNOSIS MASTER ERROR =",
            error
        );

        throw error;

    }
}

  async getAll(data: any) {

    try {

        const isValid =
            await this.repository.validateDoctorCategory(
                data.doctorId,
                data.categoryId
            );

        if (!isValid) {
            return {
                success: false,
                message: "Category not found."
            };
        }

        return this.repository.findAll();

    } catch (error) {

        console.error(
            "SERVICE GET DIAGNOSIS MASTER ERROR =",
            error
        );

        throw error;

    }
}

  async update(
    id: number,
    body: any
) {

    try {

        const isValid =
            await this.repository.validateDoctorCategory(
                body.doctorId,
                body.categoryId
            );

        if (!isValid) {
            return {
                success: false,
                message: "Category not found."
            };
        }

        await this.repository.update(
            id,
            body
        );

        return this.repository.findById(id);

    } catch (error) {

        console.error(
            "SERVICE UPDATE DIAGNOSIS MASTER ERROR =",
            error
        );

        throw error;

    }
}

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

            return {
                success: false,
                message: "Diagnosis not found."
            };

        }

        await this.repository.delete(id);

        return {
            success: true,
            message: "Diagnosis deleted successfully"
        };

    } catch (error) {

        console.error(
            "SERVICE DELETE DIAGNOSIS MASTER ERROR =",
            error
        );

        throw error;

    }
}
  async search(data: any) {

    try {

        const isValid =
            await this.repository.validateDoctorCategory(
                data.doctorId,
                data.categoryId
            );

        if (!isValid) {
            return {
                success: false,
                message: "Category not found."
            };
        }

        return this.repository.search(
            data.keyword
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