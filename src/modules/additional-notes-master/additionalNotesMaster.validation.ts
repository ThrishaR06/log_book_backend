import { t } from "elysia";

// ==========================
// CREATE
// ==========================
export const createAdditionalNotesValidation = t.Object({
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
export const updateAdditionalNotesValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    instruction: t.String({
        minLength: 1,
        maxLength: 500,
    }),
});

// ==========================
// PARAMS (GET BY ID / UPDATE / DELETE)
// ==========================
export const additionalNotesIdParams = t.Object({
    id: t.Number({
        minimum: 1,
    }),
});

// ==========================
// GET ALL
// ==========================
export const getAllAdditionalNotesValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),
});

// ==========================
// SEARCH
// ==========================
export const searchAdditionalNotesValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    search: t.String({
        minLength: 1,
    }),
});