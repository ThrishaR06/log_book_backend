import { Elysia } from "elysia";

import { BloodLossMasterController } from "./bloodLossMaster.controller";

import {
    createBloodLossValidation,
    updateBloodLossValidation,
    bloodLossIdParams,
    getAllBloodLossValidation,
    searchBloodLossValidation,
} from "./bloodLossMaster.validation";

import { authMiddleware } from "../../middleware/auth.middleware";

export const bloodLossMasterRoutes = new Elysia({
    prefix: "/blood-loss-master",
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

            return BloodLossMasterController.create(context);
        },
        {
            body: createBloodLossValidation,
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

            return BloodLossMasterController.getAll(context);
        },
        {
            query: getAllBloodLossValidation,
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

            return BloodLossMasterController.search(context);
        },
        {
            query: searchBloodLossValidation,
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

            return BloodLossMasterController.getById(context);
        },
        {
            params: bloodLossIdParams,
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

            return BloodLossMasterController.update(context);
        },
        {
            params: bloodLossIdParams,
            body: updateBloodLossValidation,
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

            return BloodLossMasterController.delete(context);
        },
        {
            params: bloodLossIdParams,
        }
    );