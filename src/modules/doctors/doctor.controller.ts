import { DoctorService } from "./doctor.service";
import { ApiResponse } from "../../utils/apiResponse";

export class DoctorController {

 static async register({ body }: any) {

    try {

        const data = await DoctorService.register(body);

        if (data?.success === false) {
            return ApiResponse.error(data.message);
        }

        return ApiResponse.success(
            data,
            "Doctor registered successfully"
        );

    } catch (error: any) {

        console.error("REGISTER DOCTOR ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to register doctor"
        );

    }

}

   static async login({ body, cookie }: any) {

    try {

        const data = await DoctorService.login(body);

        if (data?.success === false) {
            return ApiResponse.error(data.message);
        }

        cookie.auth.set({
            value: data.sessionId,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return ApiResponse.success(
            {
                id: data.id,
                fullName: data.fullName,
                emailAddress: data.emailAddress,
                subscription: data.subscription,
            },
            "Doctor login successful"
        );

    } catch (error: any) {

        console.error("LOGIN DOCTOR ERROR =", error);

        return ApiResponse.error(
            error.message || "Login failed"
        );

    }

}

static async logout({ cookie }: any) {

    try {

        const sessionId = cookie.auth.value;

        if (!sessionId) {
            return {
                success: false,
                message: "No active session",
            };
        }

        const result = await DoctorService.logout(sessionId);

        if (!result.success) {
            return result;
        }

        cookie.auth.remove();

        return {
            success: true,
            message: "Logged out successfully",
        };

    } catch (error: any) {

        console.error("LOGOUT ERROR =", error);

        return {
            success: false,
            message: error.message || "Logout failed",
        };

    }

}

    static async profile({ user }: any) {
    return ApiResponse.success(user);
}

static async getAll({ user }: any) {

    try {

        const data = await DoctorService.getAll();

        return ApiResponse.success(
            {
                requestedBy: user,
                doctors: data,
            },
            "Doctors fetched successfully"
        );

    } catch (error: any) {

        console.error("GET ALL DOCTORS ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to fetch doctors"
        );

    }

}

static async getById({ params }: any) {

    try {

        const data = await DoctorService.getById(
            Number(params.id)
        );

        if (data.success === false) {
            return ApiResponse.error(data.message);
        }

        return ApiResponse.success(
            data.data,
            data.message
        );

    } catch (error: any) {

        console.error("GET DOCTOR BY ID ERROR =", error);

        return ApiResponse.error(
            error.message || "Failed to fetch doctor"
        );

    }

}

static async getProfile({ store }: any) {

    try {

        const data = await DoctorService.getProfile(
            store.user.id
        );

        return ApiResponse.success(
            data,
            "Doctor profile fetched successfully"
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to fetch doctor profile"
        );
    }
}



static async updateProfile({ body, store }: any) {
// Full Name validation
if (!body.fullName?.trim()) {
    return {
        success: false,
        message: "Full name is required"
    };
}

// Phone validation
if (
    body.phone &&
    !/^[0-9]{10}$/.test(body.phone)
) {
    return {
        success: false,
        message: "Phone number must be 10 digits"
    };
}

// Email validation
if (
    body.emailAddress &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.emailAddress)
) {
    return {
        success: false,
        message: "Invalid email address"
    };
}

// Designation validation
if (!body.designation?.trim()) {
    return {
        success: false,
        message: "Designation is required"
    };
}

// Speciality validation
if (!body.speciality?.trim()) {
    return {
        success: false,
        message: "Speciality is required"
    };
}


    try {

        const data =
            await DoctorService.updateProfile(
                store.user.id,
                body
            );

        return {
            success: true,
            message: "Profile updated successfully",
            data
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message || "Failed to update profile"
        };
    }
}


}