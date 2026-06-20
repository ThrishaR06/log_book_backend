import { Elysia } from "elysia";

import {
  PostOpOrdersController
}
from "./postOpOrders.controller";

import {
  createPostOpOrderSchema
}
from "./postOpOrders.validation";

const controller =
new PostOpOrdersController();

export const postOpOrdersRoutes =
new Elysia({
  prefix: "/post-op-orders"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body:
    createPostOpOrderSchema
  }
)

.get(
  "/surgery/:surgeryId",
  ({ params }) =>
    controller.getBySurgeryId(
      Number(params.surgeryId)
    )
);