import {
    mysqlTable,
    bigint,
    varchar,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const ivFluidMasters = mysqlTable("iv_fluid_masters", {
    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),
        categoryId: bigint("category_id", {
    mode: "number",
}).notNull(),

    fluidName: varchar("fluid_name", {
        length: 255,
    }).notNull(),

    defaultRate: varchar("default_rate", {
        length: 100,
    }),

    notes: text("notes"),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow(),
});