import { Elysia } from "elysia";

import { DiagnosisMasterController }
from "./diagnosisMaster.controller";

import {
  createDiagnosisSchema,
  updateDiagnosisSchema
}
from "./diagnosisMaster.validation";

const controller =
  new DiagnosisMasterController();

export const diagnosisMasterRoutes =
  new Elysia({
    prefix: "/diagnosis-master"
  })

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body: createDiagnosisSchema
  }
)

.get(
  "/",
  () =>
    controller.getAll()
)

.get(
  "/search",
  ({ query }) =>
    controller.search(
      String(query.keyword || "")
    )
)

.put(
  "/:id",
  ({ params, body }) =>
    controller.update(
      params.id,
      body
    ),
  {
    body: updateDiagnosisSchema
  }
)

.delete(
  "/:id",
  ({ params }) =>
    controller.delete(
      params.id
    )
);