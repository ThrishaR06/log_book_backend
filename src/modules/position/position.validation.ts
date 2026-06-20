import { t } from "elysia";

export const createPositionSchema = t.Object({
  doctorId: t.Number(),
  categoryId: t.Number(),
  positionName: t.String()
});

export const updatePositionSchema = t.Object({
  positionName: t.String()
});

