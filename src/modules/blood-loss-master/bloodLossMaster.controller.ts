import { BloodLossMasterService } from "./bloodLossMaster.service";

export class BloodLossMasterController {

    // ==========================
    // CREATE
    // ==========================
    static async create({ body, store }: any) {
        return await BloodLossMasterService.create({
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });
    }

    // ==========================
    // GET ALL
    // ==========================
    static async getAll({ query, store }: any) {
        return await BloodLossMasterService.getAll({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
        });
    }

    // ==========================
    // GET BY ID
    // ==========================
    static async getById({ params, store }: any) {
        return await BloodLossMasterService.getById({
            id: Number(params.id),
            doctorId: store.user.id,
        });
    }

    // ==========================
    // UPDATE
    // ==========================
    static async update({ params, body, store }: any) {
        return await BloodLossMasterService.update({
            id: Number(params.id),
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });
    }

    // ==========================
    // DELETE
    // ==========================
    static async delete({ params, store }: any) {
        return await BloodLossMasterService.delete({
            id: Number(params.id),
            doctorId: store.user.id,
        });
    }

    // ==========================
    // SEARCH
    // ==========================
    static async search({ query, store }: any) {
        return await BloodLossMasterService.search({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
            search: query.search,
        });
    }
}