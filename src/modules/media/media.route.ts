import { Elysia } from "elysia";
import { MediaController } from "./media.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const controller = new MediaController();

export const mediaRoutes = new Elysia({ prefix: "/media" })

  // Upload media
  .post(
    "/upload",
    controller.upload,
    {
      beforeHandle: [authMiddleware],
    }
  )

  // Delete media by id
  .delete(
    "/:id",
    MediaController.deleteMedia,
    {
        beforeHandle: [authMiddleware],
    }
)