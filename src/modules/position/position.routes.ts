import { Elysia } from "elysia";
import { PositionController } from "./position.controller";
import {
  createPositionSchema,
  updatePositionSchema
} from "./position.validation";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

const controller = new PositionController();

export const positionRoutes = new Elysia({
  prefix: "/positions"
})

.post(
  "/",
  ({ body, store }: any ) =>
    controller.create({
      ...body,
      doctorId: store.user.id
    }),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ],
    body: createPositionSchema
  }
)

.get(
  "/",
  ({ store }:any) =>
    controller.getAll(
      store.user.id
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
)

.get(
  "/search",
  ({ query, store }:any) =>
    controller.search(
      store.user.id,
      String(query.keyword || "")
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
)

.get(
  "/list",
  ({ query, store }:any) =>
    controller.list(
      store.user.id,
      Number(query.categoryId)
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
)

.get(
  "/:id",
  ({ params, store }:any) =>
    controller.getById(
      Number(params.id),
      store.user.id
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
)

.put(
  "/:id",
  ({ params, body, store }:any) =>
    controller.update(
      Number(params.id),
      {
        ...body,
        doctorId: store.user.id
      }
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ],
    body: updatePositionSchema
  }
)

.delete(
  "/:id",
  ({ params, store }:any) =>
    controller.delete(
      Number(params.id),
      store.user.id
    ),
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
);