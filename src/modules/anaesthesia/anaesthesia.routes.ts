import { Elysia } from "elysia";
import { AnaesthesiaController } from "./anaesthesia.controller";
import {
  createAnaesthesiaSchema,
  updateAnaesthesiaSchema
} from "./anaesthesia.validation";

const controller = new AnaesthesiaController();

export const anaesthesiaRoutes = new Elysia({
  prefix: "/anaesthesia"
})

// CREATE
.post(
  "/",
  ({ body }) => controller.create(body),
  {
    body: createAnaesthesiaSchema
  }
)

// GET ALL BY DOCTOR
.get(
  "/doctor/:doctorId",
  ({ params }) =>
    controller.getAll(Number(params.doctorId))
)

// SEARCH (FIXED - no categoryId)
.get(
  "/search",
  ({ query }) =>
    controller.search(
      Number(query.doctorId),
      String(query.keyword || "")
    )
)

// GET BY ID
.get(
  "/:id",
  ({ params }) =>
    controller.getById(Number(params.id))
)

// UPDATE
.put(
  "/:id",
  ({ params, body }) =>
    controller.update(Number(params.id), body),
  {
    body: updateAnaesthesiaSchema
  }
)

// DELETE
.delete(
  "/:id",
  ({ params }) =>
    controller.delete(Number(params.id))
);