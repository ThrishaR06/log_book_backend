import { Elysia } from "elysia";

import { SurgeryStaffController } from "./surgeryStaff.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

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
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.create(context);

  },
  {
    body: createSurgeryStaffSchema
  }
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
  "/search",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.search(context);

  }
)

  .get(
  "/list",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.list(context);

  }
)

  .get(
  "/by-type",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.listByStaffType(context);

  }
)

  .get(
  "/:id",
  async (context) => {

    const auth = await authMiddleware(context);

    if (auth) {
      return auth;
    }

    return controller.getById(context);

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
      body: createSurgeryStaffSchema
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