import { SpecimensMasterService } from "./specimensMaster.service";

export class SpecimensMasterController {

    // ==========================
    // CREATE
    // ==========================
    static async create({ body, store }: any) {

        return await SpecimensMasterService.create({
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });

    }

    // ==========================
    // GET ALL
    // ==========================
    static async getAll({ query, store }: any) {

        return await SpecimensMasterService.getAll({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
        });

    }

    // ==========================
    // GET BY ID
    // ==========================
    static async getById({ params, store }: any) {

        return await SpecimensMasterService.getById({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    }

    // ==========================
    // UPDATE
    // ==========================
    static async update({ params, body, store }: any) {

        return await SpecimensMasterService.update({
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

        return await SpecimensMasterService.delete({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    }

    // ==========================
    // SEARCH
    // ==========================
    static async search({ query, store }: any) {

        return await SpecimensMasterService.search({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
            search: query.search,
        });

    }

}