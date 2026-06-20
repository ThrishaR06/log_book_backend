import { AdminService } from "./admin.service";
import { ApiResponse } from "../../utils/apiResponse";

export class AdminController {

    static async login({ body }: any) {

        const data = await AdminService.login(body);

        return ApiResponse.success(
        data,
        "Admin login successful"
    );
    }

    static async doctors() {

        const data = await AdminService.getDoctors();

         return ApiResponse.success(data);
    }

    static async hospitals() {

        const data = await AdminService.getHospitals();

        return ApiResponse.success(data);
    }

    static async subscriptions() {

        const data = await AdminService.getSubscriptions();

        return ApiResponse.success(data);
    }

    static async dashboard() {

        const data = await AdminService.getDashboard();

        return ApiResponse.success(data);
    }
}