import { t } from "elysia";

export const createProcedureDetailsSchema = t.Object({

  categoryId: t.Numeric(),

  instruction: t.String({
    minLength: 1
  })

});

export const updateProcedureDetailsSchema = t.Object({

  categoryId: t.Optional(
    t.Numeric()
  ),

  instruction: t.String({
    minLength: 1
  })

});