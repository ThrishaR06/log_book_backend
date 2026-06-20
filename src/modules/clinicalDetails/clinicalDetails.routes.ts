import { Elysia, t } from "elysia";
import { ClinicalDetailsController }
from "./clinicalDetails.controller";

const controller =
new ClinicalDetailsController();

const clinicalDetailsSchema =
t.Object({

  surgeryId: t.Number(),

  diagnosis: t.String(),

  operativeFindings: t.String(),

  procedureDetails: t.String(),

  bloodLoss: t.String(),

  specimens: t.String(),

  additionalNotes: t.String()
});

export const clinicalDetailsRoutes =
new Elysia({
  prefix: "/clinical-details"
})

.post(
  "/",
  ({ body }) =>
    controller.create(body),
  {
    body:
      clinicalDetailsSchema
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
      clinicalDetailsSchema
  }
);