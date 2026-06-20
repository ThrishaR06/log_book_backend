import jwt from "jsonwebtoken";
import { db } from "../db";
import { subscriptions } from "../db/schema/subscriptions";
import { sessions } from "../db/schema/sessions";
import { eq } from "drizzle-orm";

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

        // Fetch subscription
        const subscription = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.doctorId, decoded.id))
            .orderBy(subscriptions.createdAt);

        const current =
            subscription[subscription.length - 1] || null;

        // Attach authenticated user
        store.user = {
            id: decoded.id,
            role: decoded.role,
            subscription: current
                ? {
                      plan: current.plan,
                      status: current.status,
                      startDate: current.startDate,
                      endDate: current.endDate,
                  }
                : {
                      plan: "free",
                      status: "active",
                      startDate: null,
                      endDate: null,
                  },
        };
    } catch (error) {
        return {
            success: false,
            message: "Invalid session",
        };
    }
};