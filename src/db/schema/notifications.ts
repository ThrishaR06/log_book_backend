import {
    mysqlTable,
    bigint,
    varchar,
    text,
    boolean,
    timestamp,
} from "drizzle-orm/mysql-core";

export const notifications = mysqlTable("notifications", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),

    title: varchar("title", { length: 255 })
        .notNull(),

    message: text("message"),

    isRead: boolean("is_read")
        .default(false),

    createdAt: timestamp("created_at")
        .defaultNow(),
});