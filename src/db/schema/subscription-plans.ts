import {
  mysqlTable,
  bigint,
  decimal,
  mysqlEnum,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";

import { subscriptions } from "./subscriptions";

export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .autoincrement(),

  subscriptionId: bigint("subscription_id", {
    mode: "number",
  })
    .notNull()
    .references(() => subscriptions.id, {
      onDelete: "cascade",
    }),

  amount: decimal("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  frequency: mysqlEnum("frequency", [
    "monthly",
    "quarterly",
    "half_yearly",
    "yearly",
  ]).notNull(),

  isActive: tinyint("is_active")
    .default(1),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .defaultNow(),
});