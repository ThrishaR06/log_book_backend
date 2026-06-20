import { Elysia } from "elysia";

import { AnaesthesiaController }
from "./anaesthesia.controller";

import {createAnaesthesiaSchema,updateAnaesthesiaSchema}
from "./anaesthesia.validation";

const controller =
new AnaesthesiaController();

export const anaesthesiaRoutes =
new Elysia({
  prefix: "/anaesthesia"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body:
    createAnaesthesiaSchema
  }
)

.get(
  "/doctor/:doctorId",
  ({ params }) =>
    controller.getAll(
      Number(params.doctorId)
    )
)

.get(
  "/search",
  ({ query }) =>
    controller.search(
      Number(query.doctorId),
      String(
        query.keyword || ""
      )
    )
)

.get(
 "/list",
 ({ query }) =>
 controller.list(
   Number(query.doctorId),
   Number(query.categoryId)
 )
)

.get(
  "/:id",
  ({ params }) =>
    controller.getById(
      Number(params.id)
    )
)

.put(
  "/:id",
  ({ params, body }) =>
    controller.update(
      Number(params.id),
      body
    ),
  {
    body:
    updateAnaesthesiaSchema
  }
)

.delete(
  "/:id",
  ({ params }) =>
    controller.delete(
      Number(params.id)
    )
);