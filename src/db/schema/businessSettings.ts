import {
    mysqlTable,
    int,
    varchar,
    text,
    timestamp,
    uniqueIndex,
} from "drizzle-orm/mysql-core";

import { doctors } from "./doctors";

export const businessSettings = mysqlTable(
    "business_settings",
    {
        id: int("id").autoincrement().primaryKey(),

        doctorId: int("doctor_id")
            .notNull()
            .references(() => doctors.id),

        settingKey: varchar("setting_key", {
            length: 100,
        }).notNull(),

        settingValue: text("setting_value").notNull(),

        createdAt: timestamp("created_at").defaultNow(),

        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        doctorKeyUnique: uniqueIndex(
            "uq_business_settings_doctor_key"
        ).on(table.doctorId, table.settingKey),
    })
);