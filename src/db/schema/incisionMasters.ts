import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const incisionMasters = mysqlTable(
  "incision_masters",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),

    doctorId: bigint("doctor_id", {
      mode: "number",
    }).notNull(),

    incisionName: varchar("incision_name", {
      length: 255,
    }).notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);