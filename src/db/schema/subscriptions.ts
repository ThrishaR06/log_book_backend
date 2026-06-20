import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const subscriptions = mysqlTable("subscriptions", {
    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),

    plan: varchar("plan", { length: 50 })
        .notNull(),

    status: varchar("status", { length: 20 })
        .notNull(),

    startDate: timestamp("start_date")
        .defaultNow(),

    endDate: timestamp("end_date"),

    createdAt: timestamp("created_at")
        .defaultNow(),
});