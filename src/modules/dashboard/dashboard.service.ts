import { DashboardRepository } from "./dashboard.repository";
import { DashboardExcel } from "./dashboard.excel";
import { DashboardPdf } from "./dashboard.pdf";


export class DashboardService {

    private repository = new DashboardRepository();

    /**
     * Dashboard Summary
     */
    async getSummary(
        doctorId: number,
        filter: string
    ) {

        const summary =
            await this.repository.getSummary(
                doctorId,
                filter
            );

        return {
            success: true,
            message: "Dashboard summary fetched successfully.",
            data: summary,
        };
    }

    /**
     * Dashboard Cards
     */
    async getDashboardCards(
        doctorId: number
    ) {

        const cards =
            await this.repository.getDashboardCards(
                doctorId
            );

        return {

            success: true,

            message: "Dashboard cards fetched successfully.",

            data: cards

        };

    }

    /**
     * Weekly Revenue Chart
     */
    async getWeeklyRevenue(
        doctorId: number
    ) {

        const revenue =
            await this.repository.getWeeklyRevenue(
                doctorId
            );

        return {

            success: true,

            message: "Weekly revenue fetched successfully.",

            data: revenue

        };

    }

    /**
     * Hospital Filter List
     */
    async getHospitals(doctorId: number) {

        const hospitals =
            await this.repository.getHospitals(doctorId);

        return {
            success: true,
            message: "Hospitals fetched successfully.",
            data: hospitals,
        };
    }

        /**
 * Finance Details
 */
    async getFinanceDetails(
        doctorId: number,
        filters: any
    ) {

        const result =
            await this.repository.getFinanceDetails(
                doctorId,
                filters
            );

        return {

            success: true,

            message: `${result.message} details fetched successfully.`,

            data: result.data,

            pagination: result.pagination

        };

    }

    /**
     * Earnings List
     */
    async getEarnings(
        doctorId: number,
        filters: any
    ) {

        const earnings =
            await this.repository.getEarnings(
                doctorId,
                filters
            );

        return {
            success: true,
            message: "Dashboard earnings fetched successfully.",
            data: earnings.data,
            pagination: earnings.pagination,
        };
    }



    async exportPdf(
        doctorId: number,
        filters: any
    ) {

        const data = await this.repository.getExportData(
            doctorId,
            filters
        );
        console.log(data);

        const doctor = await this.repository.getDoctorName(
            doctorId
        );

        return await DashboardPdf.generate(
            data,
            doctor?.fullName ?? "Doctor"
        );
    }
    async exportExcel(
        doctorId: number,
        filters: any
    ) {

        const data = await this.repository.getExportData(
            doctorId,
            filters
        );

        return await DashboardExcel.generate(data);

    }
}