export const ApiResponse = {
    success(data: any = null, message = "Success") {
        return {
            success: true,
            message,
            data,
        };
    },

    error(message = "Something went wrong", data: any = null) {
        return {
            success: false,
            message,
            data,
        };
    },
};