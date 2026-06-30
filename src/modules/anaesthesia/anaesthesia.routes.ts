import { Elysia } from "elysia";
import { AnaesthesiaController } from "./anaesthesia.controller";
import {
    createAnaesthesiaSchema,
    updateAnaesthesiaSchema
} from "./anaesthesia.validation";
import { authMiddleware } from "../../middleware/auth.middleware";

const controller = new AnaesthesiaController();

export const anaesthesiaRoutes = new Elysia({
    prefix: "/anaesthesia"
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

        return controller.create({
            doctorId: (context.store as any).user.id,
            anaesthesiaName: context.body.anaesthesiaName
        });

    },
    {
        body: createAnaesthesiaSchema
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

        return controller.getAll(
            (context.store as any).user.id
        );

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

        return controller.search(
            (context.store as any).user.id,
            String(context.query.keyword || "")
        );

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

        return controller.getById(
            Number(context.params.id)
        );

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

        return controller.update(
            Number(context.params.id),
            context.body
        );

    },
    {
        body: updateAnaesthesiaSchema
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

        return controller.delete(
            Number(context.params.id)
        );

    }
)

// ==========================
// LIST
// ==========================
.get(
    "/list",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.getAll(
            (context.store as any).user.id
        );

    }
);