import { Elysia } from "elysia";

import { BusinessSettingController } from "./businessSetting.controller";

import {
    saveBusinessSettingValidation,
} from "./businessSetting.validation";

import { authMiddleware } from "../../middleware/auth.middleware";

export const businessSettingRoutes = new Elysia({
    prefix: "/business-setting",
})

    // ==========================
    // SAVE
    // ==========================
    .post(
        "/",
        async (context) => {

            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return BusinessSettingController.save(context);

        },
        {
            body: saveBusinessSettingValidation,
        }
    )

    // ==========================
    // GET ALL
    // ==========================
    .get(
        "/",
        async (context) => {

            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return BusinessSettingController.getAll(context);

        }
    );