import { Elysia } from "elysia";
import { FollowUpImagingMasterController } from "./followUpImaging.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const followUpImagingMasterRoutes = new Elysia({

    prefix: "/follow-up-imaging-masters",

})

.post(
    "/",
    FollowUpImagingMasterController.create,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/",
    FollowUpImagingMasterController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/search",
    FollowUpImagingMasterController.search,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.put(
    "/:id",
    FollowUpImagingMasterController.update,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.delete(
    "/:id",
    FollowUpImagingMasterController.delete,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);