import { AdminService } from "./admin.service";
import { ApiResponse } from "../../utils/apiResponse";

export class AdminController {

    static async login(context: any) {

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
                role: result.role,
            },
            "Admin login successful"
        );
    }

    static async logout({ cookie }: any) {

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
    }

    static async doctors() {

    const data =
        await AdminService.getDoctors();

    return ApiResponse.success(
        data,
        "Doctors fetched successfully"
    );
}

   static async doctorById({
    params,
}: any) {

    const data =
        await AdminService.getDoctorById(
            Number(params.id)
        );

    return ApiResponse.success(
        data,
        "Doctor fetched successfully"
    );
}

static async deleteDoctor({
    params,
}: any) {

    await AdminService.deleteDoctor(
        Number(params.id)
    );

    return ApiResponse.success(
        {},
        "Doctor deleted successfully"
    );
}

static async updateDoctor(context: any) {

    const data =
        await AdminService.updateDoctor(
            Number(context.params.id),
            context.body
        );

    return ApiResponse.success(
        data,
        "Doctor updated successfully"
    );
}
static async subscriptions() {

    const data =
        await AdminService.getAllSubscriptions();

    return ApiResponse.success(
        data,
        "Subscriptions fetched successfully"
    );
}

static async doctorSubscription({
    params
}: any) {

    const data =
        await AdminService
            .getDoctorSubscription(
                Number(params.id)
            );

    return ApiResponse.success(
        data,
        "Subscription fetched successfully"
    );
}
static async plans() {

    const data =
        await AdminService.getPlans();

    return ApiResponse.success(
        data,
        "Plans fetched successfully"
    );
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