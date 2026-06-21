import { Elysia } from "elysia";
import { SurgeryStaffTypeController } from "./surgeryStaffType.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const surgeryStaffTypeRoutes = new Elysia({

    prefix: "/surgery-staff-types",

})

.post(
    "/",
    SurgeryStaffTypeController.create,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/",
    SurgeryStaffTypeController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/search",
    SurgeryStaffTypeController.search,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.put(
    "/:id",
    SurgeryStaffTypeController.update,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.delete(
    "/:id",
    SurgeryStaffTypeController.delete,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);