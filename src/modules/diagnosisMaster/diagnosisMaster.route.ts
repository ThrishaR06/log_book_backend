import { Elysia } from "elysia";

import { DiagnosisMasterController }
from "./diagnosisMaster.controller";

import {
  createDiagnosisSchema,
  searchDiagnosisSchema,
  updateDiagnosisSchema
}
from "./diagnosisMaster.validation";

import { authMiddleware }
from "../../middleware/auth.middleware";

const controller =
  new DiagnosisMasterController();

export const diagnosisMasterRoutes =
  new Elysia({
    prefix: "/diagnosis-master"
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
    body: createDiagnosisSchema
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

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.search(context);

    },
    {
        query: searchDiagnosisSchema,
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
    body: updateDiagnosisSchema
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
    context.params.id,
    (context.store as any).user.id
);
  }
);