import { Elysia } from "elysia";

import {
  SurgeryFinanceController
} from "./surgeryFinance.controller";

import {
  surgeryFinanceSchema
} from "./surgeryFinance.validation";

const controller =
new SurgeryFinanceController();

export const surgeryFinanceRoutes =
new Elysia({
  prefix: "/surgery-finance"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body:
      surgeryFinanceSchema
  }
)

.get(
  "/surgery/:surgeryId",
  ({ params }) =>
    controller.getBySurgeryId(
      Number(params.surgeryId)
    )
)

.put(
  "/surgery/:surgeryId",
  ({ params, body }) =>
    controller.update(
      Number(params.surgeryId),
      body
    ),
  {
    body:
      surgeryFinanceSchema
  }
)

.delete(
  "/surgery/:surgeryId",
  ({ params }) =>
    controller.delete(
      Number(params.surgeryId)
    )
);