import { Elysia } from "elysia";
import { CategoryController } from "./category.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";

export const categoryRoutes = new Elysia({
    prefix: "/categories",
})

.post(
    "/",
    CategoryController.create,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/",
    CategoryController.getAll,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.get(
    "/search",
    CategoryController.search,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)

.put(
    "/:id",
    CategoryController.update,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
)
.delete(
    "/:id",
    CategoryController.delete,
    {
        beforeHandle: [
            authMiddleware,
            roleGuard("doctor"),
        ],
    }
);