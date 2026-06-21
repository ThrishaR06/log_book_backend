import { t } from "elysia";

export const createIncisionSchema = t.Object({
  doctorId: t.Number(),
  incisionName: t.String()
});

export const updateIncisionSchema = t.Object({
  incisionName: t.String()
});