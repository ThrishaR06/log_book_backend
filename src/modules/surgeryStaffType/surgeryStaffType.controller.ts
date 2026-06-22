import { SurgeryStaffTypeService } from "./surgeryStaffType.service";

export class SurgeryStaffTypeController {

    static async create({ body }: any) {

        return await SurgeryStaffTypeService.create(body);

    }

    static async getAll() {

        return await SurgeryStaffTypeService.getAll();

    }

    static async search({ query }: any) {

        return await SurgeryStaffTypeService.search(
            query.keyword
        );

    }

    static async update({ params, body }: any) {

        return await SurgeryStaffTypeService.update(
            Number(params.id),
            body
        );

    }

    static async delete({ params }: any) {

        return await SurgeryStaffTypeService.delete(
            Number(params.id)
        );

    }

}