import { SurgeryStaffTypeRepository } from "./surgeryStaffType.repository";

export class SurgeryStaffTypeService {

    static async create(data: any) {

        try {

            return await SurgeryStaffTypeRepository.create(data);

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to create surgery staff type."
            );

        }

    }

    static async getAll() {

        try {

            return await SurgeryStaffTypeRepository.getAll();

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to fetch surgery staff types."
            );

        }

    }

    static async search(keyword: string) {

        try {

            return await SurgeryStaffTypeRepository.search(keyword);

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to search surgery staff types."
            );

        }

    }

    static async update(
        id: number,
        body: any
    ) {

        try {

            return await SurgeryStaffTypeRepository.update(
                id,
                body
            );

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to update surgery staff type."
            );

        }

    }

    static async delete(id: number) {

        try {

            return await SurgeryStaffTypeRepository.delete(id);

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to delete surgery staff type."
            );

        }

    }

}