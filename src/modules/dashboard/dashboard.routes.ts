import { Elysia } from "elysia";
import { DashboardController } from "./dashboard.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const dashboardRoutes = new Elysia()

    .get("/dashboard",DashboardController.dashboard,{beforeHandle: [authMiddleware,roleGuard("doctor"),],})

    .get("/earnings",DashboardController.earnings,{beforeHandle: [authMiddleware,roleGuard("doctor"),],})

    .get("/dashboard/earnings-by-hospital",DashboardController.earningsByHospital,{beforeHandle: [authMiddleware,roleGuard("doctor"),],});