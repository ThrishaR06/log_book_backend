import {
  mysqlTable,
  bigint,
  varchar,
  int,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";

export const subscriptions = mysqlTable("subscriptions", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .autoincrement(),

  planName: varchar("plan_name", { length: 100 })
    .notNull(),

  operationalRecordLimit: int("operational_record_limit")
    .notNull(),

  templateLimit: int("template_limit")
    .notNull(),

  storageLimit: varchar("storage_limit", { length: 50 })
    .notNull(),

  isActive: tinyint("is_active")
    .default(1),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .defaultNow(),
});