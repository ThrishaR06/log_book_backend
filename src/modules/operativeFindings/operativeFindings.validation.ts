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

// ==========================
// GET ALL
// ==========================
export const getAllOperativeFindingsSchema =
  t.Object({

    categoryId: t.Numeric()

  });

// ==========================
// SEARCH
// ==========================
export const searchOperativeFindingsSchema =
  t.Object({

    categoryId: t.Numeric(),

    keyword: t.String({
      minLength: 1
    })

  });