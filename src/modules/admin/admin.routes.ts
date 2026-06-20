import { Elysia } from "elysia";
import { AdminController } from "./admin.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const adminRoutes = new Elysia({
    prefix: "/admin",
})

    .post("/login",AdminController.login)

    .get("/doctors",AdminController.doctors,{beforeHandle: [authMiddleware,roleGuard("admin"),],})

    .get("/hospitals",AdminController.hospitals,{beforeHandle: [authMiddleware,roleGuard("admin"),],})

    .get("/subscriptions",AdminController.subscriptions,{beforeHandle: [authMiddleware,roleGuard("admin"),],})

    .get("/dashboard",AdminController.dashboard,{beforeHandle: [authMiddleware,roleGuard("admin"),],});