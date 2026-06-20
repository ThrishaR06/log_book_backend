import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const anaesthesiaMasters = mysqlTable(
  "anaesthesia_masters",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
      .notNull(),

    anaesthesiaName: varchar("anaesthesia_name", {
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