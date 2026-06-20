import { t } from "elysia";

export const createSurgeryStaffSchema = t.Object({
  doctorId: t.Number(),
  staffTypeId: t.Number(),
  name: t.String(),
  qualification: t.Optional(t.String()),
  mobile: t.Optional(t.String())
});