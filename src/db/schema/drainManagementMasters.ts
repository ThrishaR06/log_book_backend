import {
    mysqlTable,
    bigint,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const drainManagementMasters = mysqlTable("drain_management_masters", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", {
        mode: "number",
    }).notNull(),

    categoryId: bigint("category_id", {
        mode: "number",
    }).notNull(),

    drainInstruction: text("drain_instruction")
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow(),

});