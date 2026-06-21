import { SpecialInstructionMasterService } from "./specialInstruction.service";

export class SpecialInstructionMasterController {

    static async create({ body, store }: any) {

        return await SpecialInstructionMasterService.create({
            doctorId: store.user.id,
            categoryId: body.categoryId,
            specialInstruction: body.specialInstruction,
        });

    }

    static async getAll({ query, store }: any) {

        return await SpecialInstructionMasterService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    static async search({ query, store }: any) {

        return await SpecialInstructionMasterService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    }

    static async update({ params, body, store }: any) {

        return await SpecialInstructionMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    }

    static async delete({ params, query, store }: any) {

        return await SpecialInstructionMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    }

}