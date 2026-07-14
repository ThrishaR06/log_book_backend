import { t } from "elysia";

// ==========================
// SAVE BUSINESS SETTING
// multipart/form-data
// ==========================
export const saveBusinessSettingValidation = t.Object({

    logo: t.Optional(
        t.File({
            type: "image",
        })
    ),

    color: t.Optional(
        t.String({
            minLength: 1,
            maxLength: 20,
        })
    ),

});

// ==========================
// PARAMS
// ==========================
export const businessSettingIdParams = t.Object({

    id: t.Number({
        minimum: 1,
    }),

});