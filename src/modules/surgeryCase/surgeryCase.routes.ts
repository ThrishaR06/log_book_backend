import { Elysia } from "elysia";
import { SurgeryCaseController } from "./surgeryCase.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { createSurgeryCaseSchem } from "./surgeryCase.validation";
import { updateSurgeryCaseSchema } from "./surgeryCase.update.validation";

const controller = new SurgeryCaseController();

export const surgeryCaseRoutes = new Elysia({
  prefix: "/surgery-cases",
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
    body: createSurgeryCaseSchem
  }
)

.get(
  "/pdf",
  (context) => controller.downloadAllPdf(context)
)

.get(
  "/",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.getAll(context);

  }
)

.get(
    "/:id/pdf",
    async (context) => controller.downloadPdf(context),
    {
        beforeHandle: authMiddleware,
    }
)

.get(
  "/:id",
  async ({ params }) => {

    return controller.getById(params);

  }
)

.put(
  "/:id",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.update(context);

  },
  {
    body: updateSurgeryCaseSchema
  }
)

.delete(
  "/:id",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.delete(context);

  }
);