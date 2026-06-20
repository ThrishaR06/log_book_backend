import { t } from "elysia";

export const createPostOpOrderSchema =
t.Object({

  surgeryId: t.Number(),

  ivFluidIds: t.Array(
    t.Number()
  ),

  medicationIds: t.Array(
    t.Number()
  ),

  monitoring: t.String(),

  diet: t.String(),

  drainManagement: t.String(),

  woundCare: t.String(),

  specialInstructions: t.String(),

  followUp: t.String(),

  followUpImaging: t.String()
});