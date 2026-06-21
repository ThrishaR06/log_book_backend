import { FollowUpMasterService } from "./followUp.service";

export class FollowUpMasterController {

    static async create({ body, store }: any) {

        return await FollowUpMasterService.create({
            doctorId: store.user.id,
            categoryId: body.categoryId,
            followUpInstruction: body.followUpInstruction,
        });

    }

    static async getAll({ query, store }: any) {

        return await FollowUpMasterService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    static async search({ query, store }: any) {

        return await FollowUpMasterService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    }

    static async update({ params, body, store }: any) {

        return await FollowUpMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    }

    static async delete({ params, query, store }: any) {

        return await FollowUpMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    }

}