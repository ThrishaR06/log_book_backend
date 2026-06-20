import { Elysia } from "elysia";

import { IncisionController } from "./incision.controller";

import {
  createIncisionSchema,
  updateIncisionSchema
} from "./incision.validation";

const controller =
new IncisionController();

export const incisionRoutes =
new Elysia({
  prefix: "/incisions"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body: createIncisionSchema
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
      String(query.keyword || "")
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
    body: updateIncisionSchema
  }
)

.delete(
  "/:id",
  ({ params }) =>
    controller.delete(
      Number(params.id)
    )
);