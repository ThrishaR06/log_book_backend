import {
    mysqlTable,
    bigint,
    varchar
} from "drizzle-orm/mysql-core";

export const surgeryStaffMasters = mysqlTable(
    "surgery_staff_masters",
    {
        id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),

        doctorId: bigint("doctor_id", {
            mode: "number",
        }).notNull(),

        staffType: varchar("staff_type", {
            length: 100,
        }).notNull(),

        name: varchar("name", {
            length: 255,
        }).notNull(),

        qualification: varchar("qualification", {
            length: 255,
        }),

        mobile: varchar("mobile", {
            length: 20,
        }),
    }
);