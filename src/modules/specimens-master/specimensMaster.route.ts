import { Elysia } from "elysia";

import { SpecimensMasterController } from "./specimensMaster.controller";

import {
    createSpecimensValidation,
    updateSpecimensValidation,
    specimensIdParams,
    getAllSpecimensValidation,
    searchSpecimensValidation,
} from "./specimensMaster.validation";

import { authMiddleware } from "../../middleware/auth.middleware";

export const specimensMasterRoutes = new Elysia({
    prefix: "/specimens-master",
})

    // ==========================
    // CREATE
    // ==========================
    .post(
        "/",
        async (context) => {
            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return SpecimensMasterController.create(context);
        },
        {
            body: createSpecimensValidation,
        }
    )

    // ==========================
    // GET ALL
    // ==========================
    .get(
        "/",
        async (context) => {
            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return SpecimensMasterController.getAll(context);
        },
        {
            query: getAllSpecimensValidation,
        }
    )

    // ==========================
    // SEARCH
    // ==========================
    .get(
        "/search",
        async (context) => {
            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return SpecimensMasterController.search(context);
        },
        {
            query: searchSpecimensValidation,
        }
    )

    // ==========================
    // GET BY ID
    // ==========================
    .get(
        "/:id",
        async (context) => {
            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return SpecimensMasterController.getById(context);
        },
        {
            params: specimensIdParams,
        }
    )

    // ==========================
    // UPDATE
    // ==========================
    .put(
        "/:id",
        async (context) => {
            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return SpecimensMasterController.update(context);
        },
        {
            params: specimensIdParams,
            body: updateSpecimensValidation,
        }
    )

    // ==========================
    // DELETE
    // ==========================
    .delete(
        "/:id",
        async (context) => {
            const auth = await authMiddleware(context);

            if (auth) {
                return auth;
            }

            return SpecimensMasterController.delete(context);
        },
        {
            params: specimensIdParams,
        }
    );