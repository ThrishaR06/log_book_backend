import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const adminSessions =
mysqlTable("admin_sessions", {

    id: bigint("id", {
        mode: "number",
    })
        .primaryKey()
        .autoincrement(),

    adminId: bigint("admin_id", {
        mode: "number",
    }).notNull(),

    sessionId: varchar("session_id", {
        length: 255,
    }).notNull(),

    token: varchar("token", {
        length: 500,
    }).notNull(),

    expiresAt: timestamp("expires_at")
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),
});