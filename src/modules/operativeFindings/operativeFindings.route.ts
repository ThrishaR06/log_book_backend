import { Elysia } from "elysia";

import { OperativeFindingsController } from "./operativeFindings.controller";

import {
  createOperativeFindingsSchema,
  updateOperativeFindingsSchema
} from "./operativeFindings.validation";

import { authMiddleware }
from "../../middleware/auth.middleware";

const controller =
  new OperativeFindingsController();

export const operativeFindingsRoutes =
  new Elysia({

    prefix: "/operative-findings"

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

    body: createOperativeFindingsSchema

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

    body: updateOperativeFindingsSchema

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