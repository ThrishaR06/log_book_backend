import { DashboardService } from "./dashboard.service";

export class DashboardController {

    private service = new DashboardService();

    /**
     * Dashboard Summary
     * GET /dashboard/summary
     */
    async getSummary(context: any) {

    const doctorId = context.store.user.id;

    const filter = context.query.filter || "all";

    return await this.service.getSummary(
        doctorId,
        filter
    );
}

    /**
     * Hospital Dropdown
     * GET /dashboard/hospitals
     */
    async getHospitals(context: any) {

        const doctorId = context.store.user.id;

        return await this.service.getHospitals(
            doctorId
        );
    }

    /**
     * Earnings List
     * GET /dashboard/earnings
     *
     * Query Params:
     * page
     * limit
     * hospital
     * search
     * fromDate
     * toDate
     */
    async getEarnings(context: any) {

        const doctorId = context.store.user.id;

        const filters = {

            page: context.query.page,

            limit: context.query.limit,

            hospital: context.query.hospital,

            search: context.query.search,

            fromDate: context.query.fromDate,

            toDate: context.query.toDate,

        };

        return await this.service.getEarnings(
            doctorId,
            filters
        );
    }

    async exportPdf(context:any){

    const doctorId=context.store.user.id;

    const filters={

        hospital:context.query.hospital,

        fromDate:context.query.fromDate,

        toDate:context.query.toDate

    };

    return await this.service.exportPdf(
        doctorId,
        filters
    );

}

async exportExcel(context:any){

    const doctorId=context.store.user.id;

    const filters={

        hospital:context.query.hospital,

        fromDate:context.query.fromDate,

        toDate:context.query.toDate

    };

    return await this.service.exportExcel(
        doctorId,
        filters
    );

}

}