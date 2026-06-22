import {
    mysqlTable,
    bigint,
    varchar,
    timestamp
} from "drizzle-orm/mysql-core";

export const operativeFindings = mysqlTable("operative_findings", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", {
        mode: "number",
    }).notNull(),

    categoryId: bigint("category_id", {
        mode: "number",
    }).notNull(),

    operativeFinding: varchar("operative_finding", {
        length: 1000,
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
        .onUpdateNow(),
});