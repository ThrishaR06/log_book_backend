import { Elysia } from "elysia";

import {
  SurgeryImagesController
}
from "./surgeryImages.controller";

import {
  createSurgeryImageSchema
}
from "./surgeryImages.validation";

const controller =
new SurgeryImagesController();

export const surgeryImagesRoutes =
new Elysia({
  prefix: "/surgery-images"
})

.post(
  "/",
  ({ body }) =>
  controller.create(body),
  {
    body:
    createSurgeryImageSchema
  }
)

.get(
  "/surgery/:surgeryId",
  ({ params }) =>
  controller.getBySurgeryId(
    Number(params.surgeryId)
  )
)

.delete(
  "/:id",
  ({ params }) =>
  controller.delete(
    Number(params.id)
  )
);