import { Elysia } from "elysia";
import { ClinicalPresetsController } from "./clinicalPresets.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const clinicalPresetsRoutes = new Elysia({
    prefix: "/clinical-presets",
})

.get(
    "/",
    ClinicalPresetsController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);