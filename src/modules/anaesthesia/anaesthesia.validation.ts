import { t } from "elysia";

export const createAnaesthesiaSchema = t.Object({
  doctorId: t.Number(),
  categoryId: t.Number(),
  anaesthesiaName: t.String()
});

export const updateAnaesthesiaSchema = t.Object({
  anaesthesiaName: t.String()
});