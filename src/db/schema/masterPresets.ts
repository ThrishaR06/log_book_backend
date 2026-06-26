import {
    mysqlTable,
    bigint,
    varchar,
    text,
    timestamp
} from "drizzle-orm/mysql-core";

export const masterPresets = mysqlTable("text_preset_masters", {
    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),

        categoryId: bigint("category_id", {
    mode: "number",
}),

    presetType: varchar("preset_type", {
        length: 100
    }).notNull(),

    presetText: text("preset_text")
            .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
});