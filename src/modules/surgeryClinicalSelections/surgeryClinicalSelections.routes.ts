import { Elysia } from "elysia";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

import {
  SurgeryClinicalSelectionsController
} from "./surgeryClinicalSelections.controller";

import {
  saveClinicalSelectionSchema
} from "./surgeryClinicalSelections.validation";

const controller =
new SurgeryClinicalSelectionsController();

export const
surgeryClinicalSelectionsRoutes =
new Elysia({
  prefix: "/clinical-selections"
})

.post(
  "/",
  ({ body, store }) =>
    controller.create({
      body,
      store
    }),
  {
    body: saveClinicalSelectionSchema,

    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
);