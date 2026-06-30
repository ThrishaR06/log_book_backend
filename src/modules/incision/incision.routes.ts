import { Elysia } from "elysia";

import { IncisionController } from "./incision.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

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
   ({ body, store }: any) =>
        controller.create({
            ...body,
            doctorId: store.user.id
        }),
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor")
        ],
        body: createIncisionSchema
    }
)

.get(
    "/",
   ({ store }: any) =>
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
    ({ store }:any) =>
        controller.list(
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
    "/:id",
    ({ params, store }: any) =>
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
        beforeHandle:[
            authMiddleware,
            roleGuard("doctor")
        ],
        body:updateIncisionSchema
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
        beforeHandle:[
            authMiddleware,
            roleGuard("doctor")
        ]
    }
);