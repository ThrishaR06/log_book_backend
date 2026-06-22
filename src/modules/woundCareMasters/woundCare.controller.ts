import { WoundCareMasterService } from "./woundCare.service";

export class WoundCareMasterController {

    static async create({ body, store }: any) {

        return await WoundCareMasterService.create({
            doctorId: store.user.id,
            categoryId: body.categoryId,
            woundInstruction: body.woundInstruction,
        });

    }

    static async getAll({ query, store }: any) {

        return await WoundCareMasterService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    static async search({ query, store }: any) {

        return await WoundCareMasterService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    }

    static async update({ params, body, store }: any) {

        return await WoundCareMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    }

    static async delete({ params, query, store }: any) {

        return await WoundCareMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    }

}