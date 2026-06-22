import {
  mysqlTable,
  bigint,
  text,
  timestamp
} from "drizzle-orm/mysql-core";

export const procedureDetailsMaster = mysqlTable(
  "procedure_details_master",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .autoincrement(),

    categoryId: bigint("category_id", {
      mode: "number"
    }).notNull(),

    instruction: text("instruction").notNull(),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .onUpdateNow(),
  }
);