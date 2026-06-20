import { DashboardService } from "./dashboard.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DashboardController {

    static async dashboard({ store }: any) {

        const data = await DashboardService.getDashboard(
            store.user.id
        );

       return ApiResponse.success(data);
    }

    static async earnings({ store }: any) {

        const data = await DashboardService.getEarnings(
            store.user.id
        );

        return ApiResponse.success(data);
    }

    static async earningsByHospital({ store }: any) {

        const data =
            await DashboardService.getEarningsByHospital(
                store.user.id
            );

        return ApiResponse.success(data);
    }
}