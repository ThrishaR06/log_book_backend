import { Elysia } from "elysia";
import { SurgeryController } from "./surgery.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const surgeryRoutes = new Elysia({ prefix: "/surgeries" })

  .post(
    "/",
    SurgeryController.create,
    {
      beforeHandle: [
        authMiddleware,
        roleGuard("doctor"),
      ],
    }
  )

  .get(
    "/",
    SurgeryController.getAll,
    {
      beforeHandle: [
        authMiddleware,
        roleGuard("doctor"),
      ],
    }
  )

  .get(
    "/:id",
    SurgeryController.getOne,
    {
      beforeHandle: [
        authMiddleware,
        roleGuard("doctor"),
      ],
    }
  )

  .put(
    "/:id",
    SurgeryController.update,
    {
      beforeHandle: [
        authMiddleware,
        roleGuard("doctor"),
      ],
    }
  )

  .delete(
    "/:id",
    SurgeryController.delete,
    {
      beforeHandle: [
        authMiddleware,
        roleGuard("doctor"),
      ],
    }
  );