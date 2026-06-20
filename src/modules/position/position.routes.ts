import { Elysia } from "elysia";
import { PositionController } from "./position.controller";
import {
  createPositionSchema,
  updatePositionSchema
} from "./position.validation";

const controller =
new PositionController();

export const positionRoutes =
new Elysia({
  prefix: "/positions"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body: createPositionSchema
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
 ({query}) =>
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
    body: updatePositionSchema
  }
)

.delete(
  "/:id",
  ({ params }) =>
    controller.delete(
      Number(params.id)
    )
);