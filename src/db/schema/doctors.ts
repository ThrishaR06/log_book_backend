import {
    mysqlTable,
    int,
    varchar,
} from "drizzle-orm/mysql-core";

import { bigint } from "drizzle-orm/mysql-core";

export const doctors = mysqlTable("doctors", {
    id: int("id").primaryKey().autoincrement(),

    roleId: bigint("role_id", {
  mode: "number",
}),

    password: varchar("password", { length: 255 }).notNull(),

    phone: varchar("phone", { length: 20 }),

    fullName: varchar("full_name", { length: 255 }).notNull(),

    emailAddress: varchar("email_address", { length: 255 }).notNull(),

    designation: varchar("designation", { length: 255 }).notNull(),

    speciality: varchar("speciality", { length: 255 }).notNull(),

    regNo: varchar("reg_no", { length: 100 }).notNull(),

    primaryHospital: varchar("primary_hospital", { length: 255 }).notNull(),

    // KEEP THESE
    

    dob: varchar("dob", { length: 50 }),

    profileImage: varchar("profile_image", {
    length: 500,
}),

    createdAt: varchar("created_at", { length: 50 }),

    updatedAt: varchar("updated_at", { length: 50 }),
});