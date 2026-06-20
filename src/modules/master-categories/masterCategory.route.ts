import { Elysia } from "elysia";
import { MasterCategoryController } from "./masterCategory.controller";

export const masterCategoryRoutes =
    new Elysia({
        prefix: "/master-categories",
    })

.get(
    "/",
    MasterCategoryController.getAll
);