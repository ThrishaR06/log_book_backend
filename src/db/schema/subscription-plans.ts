import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
  decimal,
  text,
  tinyint,
} from "drizzle-orm/mysql-core";

export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .autoincrement(),

  name: varchar("name", { length: 100 })
    .notNull(),

  description: text("description"),

  amount: decimal("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  durationDays: bigint("duration_days", {
    mode: "number",
  }).notNull(),

  cashfreePlanId: varchar("cashfree_plan_id", {
    length: 100,
  }),

  isActive: tinyint("is_active")
    .default(1),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .defaultNow(),
});