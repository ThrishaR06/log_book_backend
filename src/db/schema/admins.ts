import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const admins = mysqlTable("admins", {

    id: bigint("id", {
        mode: "number",
    })
        .primaryKey()
        .autoincrement(),

    email: varchar("email", {
        length: 255,
    })
        .notNull()
        .unique(),

    password: varchar("password", {
        length: 255,
    })
        .notNull(),

    roleId: bigint("role_id", {
  mode: "number",
}),

    status: varchar("status", {
        length: 20,
    })
        .notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),
});