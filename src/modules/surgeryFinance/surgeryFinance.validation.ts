import { t } from "elysia";

export const surgeryFinanceSchema =
t.Object({

  surgeryId: t.Number(),

  doctorFee: t.Number(),

  doctorPaymentMode: t.String(),

  doctorRemarks: t.Optional(
    t.String()
  ),

  assistantFee: t.Number(),

  assistantPaymentMode: t.String(),

  assistantRemarks: t.Optional(
    t.String()
  ),

  implantFee: t.Number(),

  implantDetails: t.Optional(
    t.String()
  ),

  implantPaidByHospital:
    t.Boolean(),

  implantReceivedFromHospital:
    t.Boolean(),

  totalAmount: t.Number()
});