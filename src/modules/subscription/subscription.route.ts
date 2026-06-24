import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth.middleware";
import { SubscriptionController } from "./subscription.controller";
import {
    createOrderSchema,
    verifyPaymentSchema,
    webhookSchema
} from "./subscription.validation";

const controller = new SubscriptionController();

export const subscriptionRoutes = new Elysia({
    prefix: "/subscriptions"
})

// ==========================
// PUBLIC ROUTES
// ==========================

// GET SUBSCRIPTION PLANS
.get(
    "/plans",
    () => controller.getPlans()
)

// CASHFREE WEBHOOK
.post(
    "/webhook",
    ({ body }) => controller.webhook(body),
    {
        body: webhookSchema
    }
)

// ==========================
// CREATE ORDER
// ==========================
.post(
    "/create-order",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        const store = context.store as any;

        return controller.createOrder({
            ...context.body,
            doctorId: store.user.id
        });

    },
    {
        body: createOrderSchema
    }
)

// ==========================
// VERIFY PAYMENT
// ==========================
.post(
    "/verify-payment",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        return controller.verifyPayment(context.body);

    },
    {
        body: verifyPaymentSchema
    }
)

// ==========================
// MY SUBSCRIPTION
// ==========================
.get(
    "/me",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        const store = context.store as any;

        return controller.mySubscription(
            store.user.id
        );

    }
)

// ==========================
// SUBSCRIPTION HISTORY
// ==========================
.get(
    "/subscription-history",
    async (context) => {

        const auth = await authMiddleware(context);

        if (auth) {
            return auth;
        }

        const store = context.store as any;

        return controller.subscriptionHistory(store.user.id);

    }
);