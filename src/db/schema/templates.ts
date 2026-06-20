import {
  mysqlTable,
  bigint,
  varchar,
  text,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";

export const templates = mysqlTable("templates", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .autoincrement(),

  doctorId: bigint("doctor_id", {
    mode: "number",
  }).notNull(),

  categoryId: bigint("category_id", {
    mode: "number",
  }).notNull(),

  templateName: varchar("template_name", {
  length: 255,
}).notNull(),

  // Procedure Name
  procedureName: varchar("procedure_name", {
    length: 255,
  }).notNull(),

  // Template Content
  diagnosisTemplate: text("diagnosis_template"),

  intraoperativeFindings: text(
    "intraoperative_findings"
  ),

  procedureDetailsTemplate: text(
    "procedure_details_template"
  ),

  // Optional (keep if currently used)
  description: text("description"),

  operativeNotes: text("operative_notes"),

  postOpOrders: text("post_op_orders"),

  financeData: json("finance_data"),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});