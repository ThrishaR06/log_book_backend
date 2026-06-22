import {
    mysqlTable,
    bigint,
    varchar,
    decimal,
    mysqlEnum,
    datetime,
    timestamp
} from "drizzle-orm/mysql-core";

export const subscriptions = mysqlTable("subscriptions", {

    id: bigint("id", { mode: "number" })
        .primaryKey()
        .autoincrement(),

    doctorId: bigint("doctor_id", { mode: "number" })
        .notNull(),

    planId: bigint("plan_id", { mode: "number" })
        .notNull(),

    orderId: varchar("order_id", { length: 100 }),

    paymentId: varchar("payment_id", { length: 100 }),

    paymentStatus: mysqlEnum("payment_status", [
        "PENDING",
        "SUCCESS",
        "FAILED",
        "CANCELLED"
    ]).default("PENDING"),

    amount: decimal("amount", {
        precision: 10,
        scale: 2
    }),

    startDate: datetime("start_date"),

    expiryDate: datetime("expiry_date"),

    transactionId: varchar("transaction_id", {
        length: 150
    }),

    paymentMethod: varchar("payment_method", {
        length: 50
    }),

    createdAt: timestamp("created_at")
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .defaultNow()

});