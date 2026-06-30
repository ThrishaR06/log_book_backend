import { Elysia, t } from "elysia";
import { ClinicalDetailsController }
from "./clinicalDetails.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

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
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.create(context);

    },
    {
        body: clinicalDetailsSchema
    }
)

.get(
    "/surgery/:surgeryId",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getBySurgeryId(context);

    }
)

.put(
    "/surgery/:surgeryId",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.update(context);

    },
    {
        body: clinicalDetailsSchema
    }
);