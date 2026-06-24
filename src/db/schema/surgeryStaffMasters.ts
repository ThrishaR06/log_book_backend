import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
   int,
} from "drizzle-orm/mysql-core";

export const surgeryStaffMasters = mysqlTable(
  "surgery_staff_masters",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .autoincrement(),

    doctorId: bigint("doctor_id", {
      mode: "number",
    }).notNull(),

    staffType: int("staff_type").notNull(),
    
    name: varchar("name", {
      length: 255,
    }).notNull(),

    qualification: varchar("qualification", {
      length: 255,
    }),

    mobile: varchar("mobile", {
      length: 20,
    }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);