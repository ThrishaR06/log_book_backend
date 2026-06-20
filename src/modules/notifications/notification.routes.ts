import { Elysia } from "elysia";
import { NotificationController } from "./notification.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const notificationRoutes = new Elysia({
    prefix: "/notifications",
})

.get("/me", NotificationController.myNotifications, {beforeHandle: [authMiddleware,roleGuard("doctor"),],})

.patch("/read/:id", NotificationController.markAsRead, {beforeHandle: [authMiddleware,roleGuard("doctor"),],});