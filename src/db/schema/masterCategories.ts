import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const masterCategories = mysqlTable(
    "master_categories",
    {
        id: bigint("id", {
            mode: "number",
        })
            .autoincrement()
            .primaryKey(),

        name: varchar("name", {
            length: 100,
        }).notNull(),

        createdAt: timestamp("created_at")
            .defaultNow(),
    }
);