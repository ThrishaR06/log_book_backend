import {
    mysqlTable,
    bigint,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const medicationMasters = mysqlTable(
    "medication_masters",
    {
        id: bigint("id", { mode: "number" })
            .primaryKey()
            .autoincrement(),

        medicationName: varchar(
            "medication_name",
            { length: 255 }
        ).notNull(),

        route: varchar("route", {
            length: 50,
        }),
        

        frequency: varchar("frequency", {
            length: 50,
        }),
        

        doctorId: bigint("doctor_id", {
            mode: "number",
        }).notNull(),

        categoryId: bigint("category_id", {
    mode: "number",
}).notNull(),

        createdAt: timestamp("created_at")
            .defaultNow(),

        updatedAt: timestamp("updated_at")
            .defaultNow(),
    }
);