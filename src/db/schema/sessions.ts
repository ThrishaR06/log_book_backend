import {
    mysqlTable,
    int,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const sessions = mysqlTable("sessions", {
    id: int("id").primaryKey().autoincrement(),

    doctorId: int("doctor_id").notNull(),

    sessionId: varchar("session_id", {
        length: 255,
    }).notNull(),

    token: varchar("token", {
        length: 500,
    }).notNull(),

    expiresAt: timestamp("expires_at").notNull(),
});