import { Elysia } from "elysia";

import { OperativeFindingsController } from "./operativeFindings.controller";

import {
  createOperativeFindingsSchema,
  updateOperativeFindingsSchema
} from "./operativeFindings.validation";

const controller =
  new OperativeFindingsController();

export const operativeFindingsRoutes =
  new Elysia({

    prefix: "/operative-findings"

  })

.post(

  "/",

  ({ body }) =>

    controller.create(body),

  {

    body: createOperativeFindingsSchema

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

    body: updateOperativeFindingsSchema

  }

)

.delete(

  "/:id",

  ({ params }) =>

    controller.delete(

      params.id

    )

);