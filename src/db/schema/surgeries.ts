import {
    mysqlTable,
    bigint,
    date,
    decimal,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const surgeries = mysqlTable("surgeries", {
    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),

    hospitalId: bigint("hospital_id", { mode: "number" })
        .notNull(),

    templateId: bigint("template_id", { mode: "number" })
        .notNull(),

    surgeryDate: date("surgery_date")
        .notNull(),

    earnings: decimal("earnings", {
        precision: 10,
        scale: 2,
    }).notNull(),

    notes: text("notes"),

    createdAt: timestamp("created_at")
        .defaultNow(),
});