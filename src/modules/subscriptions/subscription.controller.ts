import { SubscriptionService } from "./subscription.service";

export class SubscriptionController {
  static async getAll() {
    const data = await SubscriptionService.getAll();

    return {
      success: true,
      data,
    };
  }

  static async getPlans() {
    try {
      const data = await SubscriptionService.getPlans();

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch plans",
      };
    }
  }

static async upgrade(req: any) {
  const { doctorId, plan } = req.body;

  const data = await SubscriptionService.upgradePlan(
    doctorId,
    plan
  );

  return data;
}

 static async getMySubscription(ctx: any) {
  const user = ctx.store.user;

  const subscription =
    await SubscriptionService.getMySubscription(user.id);

  return {
    success: true,
    data: {
      id: user.id,
      role: user.role,
      subscription,
    },
  };
}


}