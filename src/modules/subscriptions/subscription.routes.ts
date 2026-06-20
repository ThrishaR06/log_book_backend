import { Elysia } from "elysia";
import { SubscriptionController } from "./subscription.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export const subscriptionRoutes = new Elysia({
  prefix: "/subscriptions",
})
  .get("/", SubscriptionController.getAll)

  .get("/plans", SubscriptionController.getPlans)

  .post("/upgrade", SubscriptionController.upgrade)

  .get(
    "/me",
    SubscriptionController.getMySubscription,
    {
      beforeHandle: authMiddleware,
    }
  );