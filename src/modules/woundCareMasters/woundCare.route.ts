import { Elysia } from "elysia";
import { WoundCareMasterController } from "./woundCare.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const woundCareMasterRoutes = new Elysia({

    prefix: "/wound-care-masters",

})

.post(
    "/",
    WoundCareMasterController.create,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/",
    WoundCareMasterController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/search",
    WoundCareMasterController.search,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.put(
    "/:id",
    WoundCareMasterController.update,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.delete(
    "/:id",
    WoundCareMasterController.delete,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);