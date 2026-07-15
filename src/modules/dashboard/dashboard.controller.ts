import { DashboardService } from "./dashboard.service";

export class DashboardController {

    private service = new DashboardService();

    /**
     * Dashboard Summary
     * GET /dashboard/summary
     */
    async getSummary(context: any) {

        const doctorId = context.store.user.id;

        console.log("Logged Doctor Id :", doctorId);

        const filter = context.query.filter || "all";

        return await this.service.getSummary(
            doctorId,
            filter
        );
    }

    /**
     * Dashboard Cards
     * GET /dashboard/cards
     */
    async getDashboardCards(context: any) {

        const doctorId = context.store.user.id;

        return await this.service.getDashboardCards(
            doctorId
        );

    }

    /**
     * Weekly Revenue Chart
     * GET /dashboard/weekly-revenue
     */
    async getWeeklyRevenue(context: any) {

        const doctorId = context.store.user.id;

        console.log("Doctor ID =", doctorId);

        return await this.service.getWeeklyRevenue(
            doctorId
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


    async getFinanceDetails(context: any) {

        const doctorId = context.store.user.id;

        const filters = {

            type: context.query.type,

            page: context.query.page,

            limit: context.query.limit,

            hospital: context.query.hospital,

            search: context.query.search,

            fromDate: context.query.fromDate,

            toDate: context.query.toDate,
        };

        return await this.service.getFinanceDetails(
            doctorId,
            filters
        );
    }

    async exportPdf(context: any) {

        const doctorId = context.store.user.id;

        const filters = {

            hospital: context.query.hospital,

            fromDate: context.query.fromDate,

            toDate: context.query.toDate

        };

        const pdf = await this.service.exportPdf(
            doctorId,
            filters
        );

        context.set.headers["Content-Type"] = "application/pdf";

        context.set.headers["Content-Disposition"] =
            'attachment; filename="dashboard-report.pdf"';

        return pdf;

    }

    async exportExcel(context: any) {

        const doctorId = context.store.user.id;

        const filters = {

            hospital: context.query.hospital,

            fromDate: context.query.fromDate,

            toDate: context.query.toDate

        };

        const excel = await this.service.exportExcel(
            doctorId,
            filters
        );

        context.set.headers["Content-Type"] =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        context.set.headers["Content-Disposition"] =
            'attachment; filename="dashboard-report.xlsx"';

        context.set.headers["Content-Length"] =
            excel.length.toString();

        return excel;
    }

}