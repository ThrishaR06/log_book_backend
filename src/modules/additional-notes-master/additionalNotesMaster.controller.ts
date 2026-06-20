import { AdditionalNotesMasterService } from "./additionalNotesMaster.service";

export class AdditionalNotesMasterController {

    // ==========================
    // CREATE
    // ==========================
    static async create({ body, store }: any) {

        return await AdditionalNotesMasterService.create({
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });

    }

    // ==========================
    // GET ALL
    // ==========================
    static async getAll({ query, store }: any) {

        return await AdditionalNotesMasterService.getAll({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
        });

    }

    // ==========================
    // GET BY ID
    // ==========================
    static async getById({ params, store }: any) {

        return await AdditionalNotesMasterService.getById({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    }

    // ==========================
    // UPDATE
    // ==========================
    static async update({ params, body, store }: any) {

        return await AdditionalNotesMasterService.update({
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

        return await AdditionalNotesMasterService.delete({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    }

    // ==========================
    // SEARCH
    // ==========================
    static async search({ query, store }: any) {

        return await AdditionalNotesMasterService.search({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
            search: query.search,
        });

    }

}