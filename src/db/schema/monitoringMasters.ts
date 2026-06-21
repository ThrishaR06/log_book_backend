import {
    mysqlTable,
    bigint,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const monitoringMasters = mysqlTable(
    "monitoring_masters",
    {

        id: bigint("id", { mode: "number" })
            .primaryKey()
            .autoincrement(),

        doctorId: bigint("doctor_id", {
            mode: "number",
        }).notNull(),

        monitoringInstruction: text(
            "monitoring_instruction"
        ).notNull(),

        createdAt: timestamp("created_at")
            .defaultNow(),

        updatedAt: timestamp("updated_at")
            .defaultNow(),
    }
);