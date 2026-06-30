import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

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
  ({ body, store }:any) =>
    controller.create({
      ...body,
      doctorId: store.user.id
    }),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ],
    body: createPostOpOrderSchema
  }
)

.get(
  "/surgery/:surgeryId",
  ({ params, store }:any) =>
    controller.getBySurgeryId(
      Number(params.surgeryId),
      store.user.id
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
);