import { Elysia } from "elysia";
import { DashboardController } from "./dashboard.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const controller = new DashboardController();

export const dashboardRoutes = new Elysia({
    prefix: "/dashboard",
})

.get(
    "/summary",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getSummary(context);
    }
)

.get(
    "/cards",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getDashboardCards(context);

    }
)

.get(
    "/weekly-revenue",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getWeeklyRevenue(context);

    }
)

.get(
    "/hospitals",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getHospitals(context);
    }
)

.get(
"/export/pdf",
async(context)=>{

    const auth=await authMiddleware(context);

    if(auth){

        return auth;

    }

    return controller.exportPdf(context);

}
)

.get(
"/export/excel",
async(context)=>{

    const auth=await authMiddleware(context);

    if(auth){

        return auth;

    }

    return controller.exportExcel(context);

}
)

.get(
    "/earnings",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getEarnings(context);
    }


);