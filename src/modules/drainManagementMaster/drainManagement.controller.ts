import { DrainManagementMasterService } from "./drainManagement.service";

export class DrainManagementMasterController {

    static async create({ body, store }: any) {

        return await DrainManagementMasterService.create({
            doctorId: store.user.id,
            categoryId: body.categoryId,
            drainInstruction: body.drainInstruction,
        });

    }

    static async getAll({ query, store }: any) {

        return await DrainManagementMasterService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    static async search({ query, store }: any) {

        return await DrainManagementMasterService.search(
            store.user.id,
            Number(query.categoryId),
            query.keyword
        );

    }

    static async update({ params, body, store }: any) {

        return await DrainManagementMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );

    }

    static async delete({ params, query, store }: any) {

        return await DrainManagementMasterService.delete(
            Number(params.id),
            store.user.id,
            Number(query.categoryId)
        );

    }

}