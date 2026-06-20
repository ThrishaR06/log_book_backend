import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const subscriptionPlans = mysqlTable("subscription_plans", {
    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    name: varchar("name", { length: 50 })
        .notNull(),

    durationDays: bigint("duration_days", { mode: "number" }),

    amount: bigint("amount", { mode: "number" })
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),
});