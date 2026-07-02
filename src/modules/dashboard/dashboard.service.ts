import { DashboardRepository } from "./dashboard.repository";

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

    return {
        success: true,
        message: "Export PDF data fetched successfully.",
        data
    };

}
async exportExcel(
    doctorId: number,
    filters: any
) {

    const data = await this.repository.getExportData(
        doctorId,
        filters
    );

    return {
        success: true,
        message: "Export PDF data fetched successfully.",
        data
    };

}

}