import jwt from "jsonwebtoken";
import { db } from "../db";
import { subscriptions } from "../db/schema/subscriptions";
import { sessions } from "../db/schema/sessions";
import { subscriptionPlans } from "../db/schema/subscription-plans";
import { doctorSubscriptions } from "../db/schema/doctor-subscriptions";

import { eq, desc } from "drizzle-orm";

export const authMiddleware = async ({ cookie, store }: any) => {
    const sessionId = cookie.auth.value;

    if (!sessionId) {
        return {
            success: false,
            message: "No session found",
        };
    }

    try {
        // Find session
        const session = await db.query.sessions.findFirst({
            where: eq(sessions.sessionId, sessionId),
        });

        if (!session) {
            return {
                success: false,
                message: "Session expired",
            };
        }

        // Verify stored JWT
        const decoded = jwt.verify(
            session.token,
            "SECRET_KEY"
        ) as any;

        // ==========================
// Fetch latest subscription
// ==========================

const subscription = await db
    .select({
        planId: doctorSubscriptions.planId,

        paymentStatus: doctorSubscriptions.paymentStatus,

        startDate: doctorSubscriptions.startDate,

        expiryDate: doctorSubscriptions.expiryDate,

        planName: subscriptions.planName,

        amount: subscriptionPlans.amount,

        frequency: subscriptionPlans.frequency,

        operationalRecordLimit:
            subscriptions.operationalRecordLimit,

        templateLimit:
            subscriptions.templateLimit,

        storageLimit:
            subscriptions.storageLimit,
    })
    .from(doctorSubscriptions)
    .innerJoin(
        subscriptionPlans,
        eq(
            doctorSubscriptions.planId,
            subscriptionPlans.id
        )
    )
    .innerJoin(
        subscriptions,
        eq(
            subscriptionPlans.subscriptionId,
            subscriptions.id
        )
    )
    .where(eq(doctorSubscriptions.doctorId, decoded.id))
    .orderBy(desc(doctorSubscriptions.id))
    .limit(1);

const current = subscription[0] || null;

       store.user = {
    id: decoded.id,
    role: decoded.role,

    subscription: current
        ? {
              planId: current.planId,

              planName: current.planName,

              amount: current.amount,

              frequency: current.frequency,

              operationalRecordLimit:
                  current.operationalRecordLimit,

              templateLimit:
                  current.templateLimit,

              storageLimit:
                  current.storageLimit,

              paymentStatus:
                  current.paymentStatus,

              startDate: current.startDate,

              expiryDate: current.expiryDate,
          }
        : null,
};
    } catch (error: any) {

    console.error("AUTH MIDDLEWARE ERROR =", error);

    return {
        success: false,
        message: error.message,
    };
}
};