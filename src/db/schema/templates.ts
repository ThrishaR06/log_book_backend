import {
  mysqlTable,
  bigint,
  varchar,
  text,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";

export const templates = mysqlTable(
  "procedure_note_templates",
  {
    id: bigint("id", {
      mode: "number",
    })
      .primaryKey()
      .autoincrement(),

    doctorId: bigint("doctor_id", {
      mode: "number",
    }).notNull(),

    categoryId: bigint("category_id", {
      mode: "number",
    }).notNull(),

    procedureName: varchar(
      "procedure_name",
      {
        length: 255,
      }
    ),

    diagnosisTemplate: text(
      "diagnosis_template"
    ),

    intraoperativeFindings: text(
      "intraoperative_findings"
    ),

    procedureDetailsTemplate: text(
      "procedure_details_template"
    ),

    createdAt: timestamp(
      "created_at"
    ).defaultNow(),

    updatedAt: timestamp(
      "updated_at"
    )
      .defaultNow()
      .onUpdateNow(),
  }
);