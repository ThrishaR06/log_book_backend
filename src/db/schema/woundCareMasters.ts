import {
    mysqlTable,
    bigint,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const woundCareMasters = mysqlTable("wound_care_masters", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", {
        mode: "number",
    }).notNull(),

    categoryId: bigint("category_id", {
        mode: "number",
    }).notNull(),

    woundInstruction: text("wound_instruction")
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow(),

});