import { ReportsService } from "./reports.service";

export class ReportsController {

    static async surgeries({ store, query }: any) {

        const data = await ReportsService.getSurgeryReport(
            store.user.id,
            query.from,
            query.to
        );

        return {
            success: true,
            data,
        };
    }

    static async earnings({ store, query }: any) {

        const data = await ReportsService.getEarningsReport(
            store.user.id,
            query.from,
            query.to
        );

        return {
            success: true,
            data,
        };
    }

    static async hospitals({ store }: any) {

        const data = await ReportsService.getHospitalReport(
            store.user.id
        );

        return {
            success: true,
            data,
        };
    }
}