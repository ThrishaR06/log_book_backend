import { DietMasterService } from "./diet.service";

export class DietMasterController {

    static async create({ body, store }: any) {

        return await DietMasterService.create({
            doctorId: store.user.id,
            categoryId: body.categoryId,
            dietInstruction: body.dietInstruction,
        });

    }

    static async getAll({ query, store }: any) {

        return await DietMasterService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    static async search({ query, store }: any) {

        return await DietMasterService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    }

    static async update({ params, body, store }: any) {

        return await DietMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    }

    static async delete({ params, query, store }: any) {

        return await DietMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    }

}