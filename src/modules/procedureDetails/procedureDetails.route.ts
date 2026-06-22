import { Elysia } from "elysia";

import { ProcedureDetailsController } from "./procedureDetails.controller";

import {
  createProcedureDetailsSchema,
  updateProcedureDetailsSchema
} from "./procedureDetails.validation";

const controller =
  new ProcedureDetailsController();

export const procedureDetailsRoutes =
  new Elysia({

    prefix: "/procedure-details"

  })

.post(

  "/",

  ({ body }) =>

    controller.create(body),

  {

    body: createProcedureDetailsSchema

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

    body: updateProcedureDetailsSchema

  }

)

.delete(

  "/:id",

  ({ params }) =>

    controller.delete(

      params.id

    )

);