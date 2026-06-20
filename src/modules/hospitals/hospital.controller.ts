import { HospitalService } from "./hospital.service";
import { ApiResponse } from "../../utils/apiResponse";

export class HospitalController {
    static async register({ body }: any) {
        const data = await HospitalService.register(body);

        return ApiResponse.success(
    data,
    "Hospital registered successfully"
);
    }

    static async login({ body }: any) {
        const data = await HospitalService.login(body);

       return ApiResponse.success(
    data,
    "Login successful"
);
    }

    static async getDoctors({ user }: any) {
    const data = await HospitalService.getDoctors(user.id);

   return ApiResponse.success(data);
}
}