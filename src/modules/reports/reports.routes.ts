import { Elysia } from "elysia";
import { ReportsController } from "./reports.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const reportRoutes = new Elysia({
    prefix: "/reports",
})

    .get("/surgeries",ReportsController.surgeries,{beforeHandle: [authMiddleware,roleGuard("doctor"),],})

    .get(
        "/earnings",
        ReportsController.earnings,
        {
            beforeHandle: [
                authMiddleware,
                roleGuard("doctor"),
            ],
        }
    )

    .get(
        "/hospitals",
        ReportsController.hospitals,
        {
            beforeHandle: [
                authMiddleware,
                roleGuard("doctor"),
            ],
        }
    );