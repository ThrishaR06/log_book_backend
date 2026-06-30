import { AdminService } from "./admin.service";
import { ApiResponse } from "../../utils/apiResponse";

export class AdminController {

    static async login(context: any) {

    try {

        const { body, cookie } = context;

        const result = await AdminService.login(body);

        if (!result.success) {
            return ApiResponse.error(result.message);
        }

        cookie.auth.set({
            value: result.sessionId,
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return ApiResponse.success(
            {
                id: result.id,
                email: result.email,
                roleId: result.roleId,
            },
            "Admin login successful"
        );

    } catch (error: any) {

        console.error("ADMIN LOGIN ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to login"
        );

    }

}

    static async logout({ cookie }: any) {

    try {

        const sessionId = cookie?.auth?.value;

        if (!sessionId) {
            return ApiResponse.error(
                "No active session found"
            );
        }

        await AdminService.logout(sessionId);

        cookie.auth.remove();

        return ApiResponse.success(
            {},
            "Logout successful"
        );

    } catch (error: any) {

        console.error("ADMIN LOGOUT ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to logout"
        );

    }

}

    static async doctors() {

    try {

        const data =
            await AdminService.getDoctors();

        return ApiResponse.success(
            data,
            "Doctors fetched successfully"
        );

    } catch (error: any) {

        console.error("GET DOCTORS ERROR =", error);

        return ApiResponse.error(
            error.message ||
            "Failed to fetch doctors"
        );

    }

}

   static async doctorById({ params }: any) {

    try {

        const data =
            await AdminService.getDoctorById(
                Number(params.id)
            );

        return ApiResponse.success(
            data,
            "Doctor fetched successfully"
        );

    } catch (error: any) {

        console.error(
            "GET DOCTOR BY ID ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch doctor"
        );

    }

}

static async deleteDoctor({ params }: any) {

    try {

        await AdminService.deleteDoctor(
            Number(params.id)
        );

        return ApiResponse.success(
            {},
            "Doctor deleted successfully"
        );

    } catch (error: any) {

        console.error(
            "DELETE DOCTOR ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to delete doctor"
        );

    }

}

static async updateDoctor(context: any) {

    try {

        const data =
            await AdminService.updateDoctor(
                Number(context.params.id),
                context.body
            );

        return ApiResponse.success(
            data,
            "Doctor updated successfully"
        );

    } catch (error: any) {

        console.error(
            "UPDATE DOCTOR ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to update doctor"
        );

    }

}
static async subscriptions() {

    try {

        const data =
            await AdminService.getAllSubscriptions();

        return ApiResponse.success(
            data,
            "Subscriptions fetched successfully"
        );

    } catch (error: any) {

        console.error(
            "GET SUBSCRIPTIONS ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch subscriptions"
        );

    }

}

static async doctorSubscription({ params }: any) {

    try {

        const data =
            await AdminService.getDoctorSubscription(
                Number(params.id)
            );

        return ApiResponse.success(
            data,
            "Subscription fetched successfully"
        );

    } catch (error: any) {

        console.error(
            "GET DOCTOR SUBSCRIPTION ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch subscription"
        );

    }

}
static async plans() {

    try {

        const data =
            await AdminService.getPlans();

        return ApiResponse.success(
            data,
            "Plans fetched successfully"
        );

    } catch (error: any) {

        console.error(
            "GET PLANS ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to fetch plans"
        );

    }

}

static async createPlan(context: any) {

    try {

        const body = context.body;

        console.log("PLAN BODY =", body);

        if (!body) {
            return ApiResponse.error(
                "Request body is missing"
            );
        }

        const data =
            await AdminService.createPlan(
                body
            );

        return ApiResponse.success(
            data,
            "Plan created successfully"
        );

    } catch (error: any) {

        console.error(
            "CREATE PLAN ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to create plan"
        );
    }
}

static async updatePlan(
    context: any
) {

    try {

        const data =
            await AdminService.updatePlan(
                Number(
                    context.params.id
                ),
                context.body
            );

        return ApiResponse.success(
            data,
            "Plan updated successfully"
        );

    } catch (error: any) {

        console.error(
            "UPDATE PLAN ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to update plan"
        );
    }
}

static async deletePlan(
    context: any
) {

    try {

        await AdminService.deletePlan(
            Number(
                context.params.id
            )
        );

        return ApiResponse.success(
            {},
            "Plan deleted successfully"
        );

    } catch (error: any) {

        console.error(
            "DELETE PLAN ERROR =",
            error
        );

        return ApiResponse.error(
            error.message ||
            "Failed to delete plan"
        );
    }
}
}