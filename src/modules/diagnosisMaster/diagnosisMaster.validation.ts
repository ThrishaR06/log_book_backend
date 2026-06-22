import { t } from "elysia";

export const createDiagnosisSchema = t.Object({
  categoryId: t.Numeric(),
  instruction: t.String({
    minLength: 1
  })
});

export const updateDiagnosisSchema = t.Object({
  categoryId: t.Optional(t.Numeric()),
  instruction: t.String({
    minLength: 1
  })
});