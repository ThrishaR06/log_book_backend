import { IvFluidMasterService } from "./ivFluid.service";

export class IvFluidMasterController {

    static async create({ body, store }: any) {

        return await IvFluidMasterService.create({
            doctorId: store.user.id,
            fluidName: body.fluidName,
            defaultRate: body.defaultRate,
            notes: body.notes,
        });
    }

    static async getAll({ store }: any) {

        return await IvFluidMasterService.getAll(
            store.user.id
        );
    }

    static async search({ query, store }: any) {

        return await IvFluidMasterService.search(
            store.user.id,
            query.keyword
        );
    }

    static async update({ params, body, store }: any) {

        return await IvFluidMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );
    }

    static async delete({ params, store }: any) {

        return await IvFluidMasterService.delete(
            Number(params.id),
            store.user.id
        );
    }
}