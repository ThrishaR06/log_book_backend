import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const diagnosisMasters = mysqlTable("diagnosis_masters", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .autoincrement(),

  doctorId: bigint("doctor_id", { mode: "number" }).notNull(),

  categoryId: bigint("category_id", { mode: "number" }).notNull(),

  diagnosisName: varchar("diagnosis_name", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});