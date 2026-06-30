import { SurgeryStaffTypeService } from "./surgeryStaffType.service";

export class SurgeryStaffTypeController {

    static async create({ body }: any) {

        try {

            return await SurgeryStaffTypeService.create(body);

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to create surgery staff type."
            );

        }

    }

    static async getAll() {

        try {

            return await SurgeryStaffTypeService.getAll();

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to fetch surgery staff types."
            );

        }

    }

    static async search({ query }: any) {

        try {

            return await SurgeryStaffTypeService.search(
                query.keyword
            );

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to search surgery staff types."
            );

        }

    }

    static async update({ params, body }: any) {

        try {

            return await SurgeryStaffTypeService.update(
                Number(params.id),
                body
            );

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to update surgery staff type."
            );

        }

    }

    static async delete({ params }: any) {

        try {

            return await SurgeryStaffTypeService.delete(
                Number(params.id)
            );

        } catch (error: any) {

            throw new Error(
                error.message || "Failed to delete surgery staff type."
            );

        }

    }

}