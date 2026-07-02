import { t } from "elysia";

// ==========================
// CREATE
// ==========================
export const createDiagnosisSchema = t.Object({
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
export const updateDiagnosisSchema = t.Object({
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
export const diagnosisIdParams = t.Object({
    id: t.Number({
        minimum: 1,
    }),
});

// ==========================
// GET ALL
// ==========================
export const getAllDiagnosisSchema = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),
});

// ==========================
// SEARCH
// ==========================
export const searchDiagnosisSchema = t.Object({
    categoryId: t.Number({
        minimum: 1,
    }),

    keyword: t.String({
        minLength: 1,
    }),
});