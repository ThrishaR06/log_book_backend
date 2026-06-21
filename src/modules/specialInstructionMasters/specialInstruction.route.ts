import { Elysia } from "elysia";
import { SpecialInstructionMasterController } from "./specialInstruction.controller";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const specialInstructionMasterRoutes = new Elysia({

    prefix: "/special-instruction-masters",

})

.post(
    "/",
    SpecialInstructionMasterController.create,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/",
    SpecialInstructionMasterController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/search",
    SpecialInstructionMasterController.search,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.put(
    "/:id",
    SpecialInstructionMasterController.update,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.delete(
    "/:id",
    SpecialInstructionMasterController.delete,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);