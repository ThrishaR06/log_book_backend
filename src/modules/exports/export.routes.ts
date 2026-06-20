import { Elysia } from "elysia";
import { ExportController } from "./export.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const exportRoutes = new Elysia({
    prefix: "/exports",
})

    // Excel export
    .get("/surgeries",ExportController.exportSurgeries,{beforeHandle: [authMiddleware,roleGuard("doctor"),],})

    // PDF export
    .get("/earnings",ExportController.exportEarnings,{beforeHandle: [authMiddleware,roleGuard("doctor"),],});