export const roleGuard = (role: string) => {
    return ({ store, error }: any) => {

        if (!store.user) {
            return error(401, "Unauthorized");
        }

        if (store.user.role !== role) {
            return error(403, "Access denied");
        }
    };
};