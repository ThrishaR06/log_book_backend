import { db } from "../db";
import { subscriptions } from "../db/schema/subscriptions";
import { eq } from "drizzle-orm";

export const checkSubscriptionLimit = async (context: any) => {
  const user = context?.user;

  // ✅ DO NOT THROW ON SERVER START
  if (!user?.id) {
    return {
      success: false,
      message: "Unauthorized - no user in request",
    };
  }

  const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.doctorId, user.id));

  if (!sub.length) {
    return {
      success: false,
      message: "No subscription found",
    };
  }

  if (sub[0].status !== "active") {
    return {
      success: false,
      message: "Subscription inactive",
    };
  }

  return true;
};