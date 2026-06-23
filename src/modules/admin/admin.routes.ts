import { Elysia } from "elysia";
import { AdminController } from "./admin.controller";

import { roleGuard } from "../../middleware/role.middleware";
import { adminAuthMiddleware } from "../../middleware/adminAuth.middleware";

export const adminRoutes = new Elysia({
  prefix: "/admin",
})

  .post("/login", AdminController.login)
  .post("/logout",AdminController.logout,{beforeHandle: [adminAuthMiddleware],},)
  .get(
    "/me",
    ({ store }) => ({
        success: true,
        data: (store as any).user,
    }),
    {
        beforeHandle: [
            adminAuthMiddleware,
        ],
    }
)
.get(
    "/doctors",
    AdminController.doctors,
    {
        beforeHandle: [
            adminAuthMiddleware,
        ],
    }
)
.get(
    "/doctors/:id",
    AdminController.doctorById,
    {
        beforeHandle: [
            adminAuthMiddleware,
        ],
    }
)
.delete(
    "/doctors/:id",
    AdminController.deleteDoctor,
    {
        beforeHandle: [
            adminAuthMiddleware,
        ],
    }
)
.put(
    "/doctors/:id",
    AdminController.updateDoctor,
    {
        beforeHandle: [
            adminAuthMiddleware,
        ],
    }
)
.get(
    "/subscriptions",
    AdminController.subscriptions,
    {
        beforeHandle: [
            adminAuthMiddleware
        ]
    }
)
.get(
    "/subscriptions/:id",
    AdminController.doctorSubscription,
    {
        beforeHandle: [
            adminAuthMiddleware
        ]
    }
)
.get(
    "/plans",
    AdminController.plans,
    {
        beforeHandle: [
            adminAuthMiddleware
        ]
    }
)

.post(
    "/plans",
    AdminController.createPlan,
    {
        beforeHandle: [
            adminAuthMiddleware
        ]
    }
)

.put(
    "/plans/:id",
    AdminController.updatePlan,
    {
        beforeHandle: [
            adminAuthMiddleware
        ]
    }
)

.delete(
    "/plans/:id",
    AdminController.deletePlan,
    {
        beforeHandle: [
            adminAuthMiddleware
        ]
    }
)

  
