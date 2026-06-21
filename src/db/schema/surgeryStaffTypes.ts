import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const surgeryStaffTypes = mysqlTable("surgery_staff_types", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    name: varchar("name", {
        length: 100,
    }).notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),

});