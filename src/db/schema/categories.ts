import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),

    name: varchar("name", { length: 255 })
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),
});