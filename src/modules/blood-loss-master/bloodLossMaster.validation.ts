import { t } from "elysia";

// ==========================
// CREATE
// ==========================
export const createBloodLossValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    instruction: t.String({
        minLength: 1,
        maxLength: 500,
    }),
});

// ==========================
// UPDATE
// ==========================
export const updateBloodLossValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    instruction: t.String({
        minLength: 1,
        maxLength: 500,
    }),
});

// ==========================
// PARAMS (GET BY ID / DELETE / UPDATE)
// ==========================
export const bloodLossIdParams = t.Object({
    id: t.Number({
        minimum: 1,
    }),
});

// ==========================
// GET ALL
// ==========================
export const getAllBloodLossValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),
});

// ==========================
// SEARCH
// ==========================
export const searchBloodLossValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    search: t.String({
        minLength: 1,
    }),
});