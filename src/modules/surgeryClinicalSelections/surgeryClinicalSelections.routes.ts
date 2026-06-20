import { Elysia } from "elysia";

import {
  SurgeryClinicalSelectionsController
}
from "./surgeryClinicalSelections.controller";

import {
  saveClinicalSelectionSchema
}
from "./surgeryClinicalSelections.validation";

const controller =
new SurgeryClinicalSelectionsController();

export const
surgeryClinicalSelectionsRoutes =
new Elysia({
  prefix: "/clinical-selections"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body:
      saveClinicalSelectionSchema
  }
);