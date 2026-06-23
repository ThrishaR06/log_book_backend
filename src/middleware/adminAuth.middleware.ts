import jwt from "jsonwebtoken";
import { db } from "../db";
import { adminSessions } from "../db/schema/adminSessions";
import { eq } from "drizzle-orm";

export const adminAuthMiddleware = async ({
  cookie,
  store,
}: any) => {

  const sessionId = cookie.auth?.value;

  if (!sessionId) {
    return {
      success: false,
      message: "No session found",
    };
  }

  const session = await db
    .select()
    .from(adminSessions)
    .where(
      eq(
        adminSessions.sessionId,
        sessionId
      )
    );

  if (!session.length) {
    return {
      success: false,
      message: "Session expired",
    };
  }

  const decoded = jwt.verify(
    session[0].token,
    "SECRET_KEY"
  ) as any;

  store.user = {
    id: decoded.id,
    role: decoded.role,
  };
};