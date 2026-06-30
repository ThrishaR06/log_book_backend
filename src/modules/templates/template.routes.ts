import { Elysia } from "elysia";
import { TemplateController } from "./template.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";
import { checkSubscriptionLimit } from "../../middleware/subscription.middleware";
import { CustomFieldController } from "./custom-field.controller";

export const templateRoutes = new Elysia({ prefix: "/templates" })

  .post("/", TemplateController.create, {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor"),
      checkSubscriptionLimit("template"),
    ],
  })

  .get("/", TemplateController.getAll, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })
  .get(
  "/list",
  TemplateController.getAllTemplateList,
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor"),
    ],
  }
)

  .get("/categories", TemplateController.getCategories, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })

  .get("/category/id/:categoryId", TemplateController.getByCategoryId, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })

  .get("/dropdown", TemplateController.dropdown, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })

  .get("/:id", TemplateController.getById, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })

  .put("/:id", TemplateController.update, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })

  .delete("/:id", TemplateController.delete, {
    beforeHandle: [authMiddleware, roleGuard("doctor")],
  })

.post(
  "/custom-fields",
  CustomFieldController.create,
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
)

.put(
  "/custom-fields/:id",
  CustomFieldController.update,
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
)

.delete(
  "/custom-fields/:id",
  CustomFieldController.delete,
  {
    beforeHandle: [
      authMiddleware,
      roleGuard("doctor")
    ]
  }
);
