import { t } from "elysia";

export const createOrderSchema = t.Object({
    planId: t.Number()
});

export const verifyPaymentSchema = t.Object({
    orderId: t.String()
});

export const webhookSchema = t.Object({
    orderId: t.String(),
   transactionId: t.Optional(t.String()),
    paymentStatus: t.String()
});