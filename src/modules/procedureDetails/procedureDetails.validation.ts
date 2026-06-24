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

// ==========================
// GET ALL
// ==========================
export const getAllProcedureDetailsSchema =
  t.Object({

    categoryId: t.Numeric()

  });

// ==========================
// SEARCH
// ==========================
export const searchProcedureDetailsSchema =
  t.Object({

    categoryId: t.Numeric(),

    keyword: t.String({
      minLength: 1
    })

  });