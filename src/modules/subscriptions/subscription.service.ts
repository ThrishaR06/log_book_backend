import { db } from "../../db";
import { eq } from "drizzle-orm";
import { SubscriptionMapper } from "./subscription.mapper";
import { subscriptions } from "../../db/schema/subscriptions";
import { subscriptionPlans } from "../../db/schema/subscription-plans";


export class SubscriptionService {
  static async getAll() {
    return await db
      .select()
      .from(subscriptions);
  }

static async getPlans() {
  const plans = await db.select().from(subscriptionPlans);

  const formatted = plans
    .map((p) => ({
      ...p,
      name: p.name.toLowerCase(),
    }))
    .map(SubscriptionMapper.toPlanDTO)
    .filter(Boolean);

  return formatted;
}

static async getMySubscription(doctorId: number) {
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.doctorId, doctorId))
    .orderBy(subscriptions.createdAt);

  if (!subscription.length) {
    const freePlan = await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.name, "free"));

    return {
      planId: freePlan.length ? freePlan[0].id : null,
      plan: "free",
      status: "active",
      message: "Default free plan",
    };
  }

  // get latest subscription
  const current = subscription[subscription.length - 1];

  const planData = await db
    .select()
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.name, current.plan.toLowerCase()));

  return {
    id: current.id,
    planId: planData.length ? planData[0].id : null,
    plan: current.plan,
    status: current.status,
    startDate: current.startDate,
    endDate: current.endDate,
  };
}
 static async upgradePlan(doctorId: number, plan: string) {
    
    // 1. get current subscription
    const current = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.doctorId, doctorId));

    if (!current.length) {
      return {
        success: false,
        message: "No subscription found"
      };
    }

    // 2. calculate end date
    let endDate: Date | null = null;

    if (plan === "monthly") {
      endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    if (plan === "yearly") {
      endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }

    // free = null (no expiry)
    if (plan === "free") {
      endDate = null;
    }

    // 3. deactivate old subscription
    await db
      .update(subscriptions)
      .set({ status: "inactive" })
      .where(eq(subscriptions.doctorId, doctorId));

    // 4. create new subscription
    const result = await db.insert(subscriptions).values({
      doctorId,
      plan,
      status: "active",
      startDate: new Date(),
      endDate,
    });

    return {
      success: true,
      message: "Subscription upgraded successfully",
      data: result
    };
  }

}