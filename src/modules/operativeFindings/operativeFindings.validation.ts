import { t } from "elysia";

export const createOperativeFindingsSchema = t.Object({

  categoryId: t.Numeric(),

  instruction: t.String({
    minLength: 1
  })

});

export const updateOperativeFindingsSchema = t.Object({

  categoryId: t.Optional(
    t.Numeric()
  ),

  instruction: t.String({
    minLength: 1
  })

});