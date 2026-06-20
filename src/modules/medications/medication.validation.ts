import { t } from "elysia";

// ==========================
// CREATE
// ==========================
export const createMedicationValidation = t.Object({

    categoryId: t.Number({
        minimum: 1,
    }),

    medicationName: t.String({
        minLength: 1,
        maxLength: 255,
    }),

    route: t.Optional(
        t.String({
            maxLength: 50,
        })
    ),

    frequency: t.Optional(
        t.String({
            maxLength: 50,
        })
    ),

});

// ==========================
// UPDATE
// ==========================
export const updateMedicationValidation = t.Object({

    categoryId: t.Number({
        minimum: 1,
    }),

    medicationName: t.String({
        minLength: 1,
        maxLength: 255,
    }),

    route: t.Optional(
        t.String({
            maxLength: 50,
        })
    ),

    frequency: t.Optional(
        t.String({
            maxLength: 50,
        })
    ),

});

// ==========================
// PARAMS
// ==========================
export const medicationIdValidation = t.Object({

    id: t.Number({
        minimum: 1,
    }),

});

// ==========================
// GET ALL
// ==========================
export const getMedicationValidation = t.Object({

    categoryId: t.Number({
        minimum: 1,
    }),

});

// ==========================
// SEARCH
// ==========================
export const searchMedicationValidation = t.Object({

    categoryId: t.Number({
        minimum: 1,
    }),

    keyword: t.String({
        minLength: 1,
    }),

});