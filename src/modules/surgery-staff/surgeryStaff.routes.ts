import { Elysia } from "elysia";

import { SurgeryStaffController } from "./surgeryStaff.controller";

import {
  createSurgeryStaffSchema
} from "./surgeryStaff.validation";

const controller =
  new SurgeryStaffController();

export const surgeryStaffRoutes =
  new Elysia({
    prefix: "/surgery-staff"
  })

  .post(
    "/",
    ({ body }) =>
      controller.create(body),
    {
      body: createSurgeryStaffSchema
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
        Number(query.doctorId)
      )
  )

  .get(
    "/by-type",
    ({ query }) =>
        controller.listByStaffType(
            Number(query.doctorId),
            Number(query.staffType)
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
      body: createSurgeryStaffSchema
    }
  )

  .delete(
    "/:id",
    ({ params }) =>
      controller.delete(
        Number(params.id)
      )
  );