import { FollowUpImagingMasterService } from "./followUpImaging.service";

export class FollowUpImagingMasterController {

    static async create({ body, store }: any) {

        return await FollowUpImagingMasterService.create({
            doctorId: store.user.id,
            categoryId: body.categoryId,
            followUpImagingInstruction:
                body.followUpImagingInstruction,
        });

    }

    static async getAll({ query, store }: any) {

        return await FollowUpImagingMasterService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    static async search({ query, store }: any) {

        return await FollowUpImagingMasterService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    }

    static async update({ params, body, store }: any) {

        return await FollowUpImagingMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    }

    static async delete({ params, query, store }: any) {

        return await FollowUpImagingMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    }

}