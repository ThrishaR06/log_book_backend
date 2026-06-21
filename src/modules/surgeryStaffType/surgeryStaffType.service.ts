import { SurgeryStaffTypeRepository } from ".//surgeryStaffType.repository";

export class SurgeryStaffTypeService {

    static async create(data: any) {

        return await SurgeryStaffTypeRepository.create(data);

    }

    static async getAll() {

        return await SurgeryStaffTypeRepository.getAll();

    }

    static async search(keyword: string) {

        return await SurgeryStaffTypeRepository.search(keyword);

    }

    static async update(
        id: number,
        body: any
    ) {

        return await SurgeryStaffTypeRepository.update(
            id,
            body
        );

    }

    static async delete(id: number) {

        return await SurgeryStaffTypeRepository.delete(id);

    }

}