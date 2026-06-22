import { MonitoringMasterService } from "./monitoring.service";

export class MonitoringMasterController {

    static async create({ body, store }: any) {

        return await MonitoringMasterService.create({
            doctorId: store.user.id,
            monitoringInstruction: body.monitoringInstruction,
        });
    }

    static async getAll({ store }: any) {

        return await MonitoringMasterService.getAll(
            store.user.id
        );
    }

    static async search({ query, store }: any) {

        return await MonitoringMasterService.search(
            store.user.id,
            query.keyword
        );
    }

    static async update({ params, body, store }: any) {

        return await MonitoringMasterService.update(
            Number(params.id),
            store.user.id,
            body
        );
    }

    static async delete({ params, store }: any) {

        return await MonitoringMasterService.delete(
            Number(params.id),
            store.user.id
        );
    }
}