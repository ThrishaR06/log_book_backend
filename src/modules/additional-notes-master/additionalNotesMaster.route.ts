import { Elysia } from "elysia";

import { AdditionalNotesMasterController } from "./additionalNotesMaster.controller";

import {
    createAdditionalNotesValidation,
    updateAdditionalNotesValidation,
    additionalNotesIdParams,
    getAllAdditionalNotesValidation,
    searchAdditionalNotesValidation,
} from "./additionalNotesMaster.validation";

import { authMiddleware } from "../../middleware/auth.middleware";

export const additionalNotesMasterRoutes = new Elysia({
    prefix: "/additional-notes-master",
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

            return AdditionalNotesMasterController.create(context);
        },
        {
            body: createAdditionalNotesValidation,
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

            return AdditionalNotesMasterController.getAll(context);
        },
        {
            query: getAllAdditionalNotesValidation,
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

            return AdditionalNotesMasterController.search(context);
        },
        {
            query: searchAdditionalNotesValidation,
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

            return AdditionalNotesMasterController.getById(context);
        },
        {
            params: additionalNotesIdParams,
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

            return AdditionalNotesMasterController.update(context);
        },
        {
            params: additionalNotesIdParams,
            body: updateAdditionalNotesValidation,
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

            return AdditionalNotesMasterController.delete(context);
        },
        {
            params: additionalNotesIdParams,
        }
    );