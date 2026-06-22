import { Elysia } from "elysia";
import { DietMasterController } from "./diet.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const dietMasterRoutes = new Elysia({

    prefix: "/diet-masters",

})

.post(
    "/",
    DietMasterController.create,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/",
    DietMasterController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/search",
    DietMasterController.search,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.put(
    "/:id",
    DietMasterController.update,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.delete(
    "/:id",
    DietMasterController.delete,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);