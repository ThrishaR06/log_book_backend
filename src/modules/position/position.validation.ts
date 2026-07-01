import { t } from "elysia";

export const createPositionSchema = t.Object({
  positionName: t.String()
});

export const updatePositionSchema = t.Object({
  positionName: t.String()
});

