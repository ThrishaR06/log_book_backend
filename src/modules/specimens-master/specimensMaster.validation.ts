import { t } from "elysia";

// ==========================
// CREATE
// ==========================
export const createSpecimensValidation = t.Object({
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
export const updateSpecimensValidation = t.Object({
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
export const specimensIdParams = t.Object({
    id: t.Number({
        minimum: 1,
    }),
});

// ==========================
// GET ALL
// ==========================
export const getAllSpecimensValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),
});

// ==========================
// SEARCH
// ==========================
export const searchSpecimensValidation = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    search: t.String({
        minLength: 1,
    }),
});