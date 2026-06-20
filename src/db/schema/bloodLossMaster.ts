import {
    mysqlTable,
    bigint,
    int,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const bloodLossMaster = mysqlTable("blood_loss_master", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: int("doctor_id").notNull(),

    categoryId: bigint("category_id", { mode: "number" }).notNull(),

    instruction: text("instruction").notNull(),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
        .onUpdateNow(),
});