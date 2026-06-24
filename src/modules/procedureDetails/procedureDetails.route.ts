import { Elysia } from "elysia";

import { ProcedureDetailsController }
from "./procedureDetails.controller";

import {
  createProcedureDetailsSchema,
  updateProcedureDetailsSchema,
  getAllProcedureDetailsSchema,
  searchProcedureDetailsSchema
}
from "./procedureDetails.validation";

import { authMiddleware }
from "../../middleware/auth.middleware";

const controller =
  new ProcedureDetailsController();

export const procedureDetailsRoutes =
  new Elysia({

    prefix: "/procedure-details"

  })

.post(

  "/",

  async (context) => {

    const auth =
      await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.create(context);
  },

  {

    body: createProcedureDetailsSchema

  }

)

.get(

  "/",

  async (context) => {

    const auth =
      await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.getAll(context);
  },

  {
    query: getAllProcedureDetailsSchema
  }

)

.get(

  "/search",

  async (context) => {

    const auth =
      await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.search(context);
  },

  {
    query: searchProcedureDetailsSchema
  }

)

.put(

  "/:id",

  async (context) => {

    const auth =
      await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.update(
      context.params.id,
      context
    );
  },

  {

    body: updateProcedureDetailsSchema

  }

)

.delete(

  "/:id",

  async (context) => {

    const auth =
      await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.delete(
      context.params.id
    );
  }

);