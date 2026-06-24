import { t } from "elysia";

export const createSurgeryStaffSchema = t.Object({
  doctorId: t.Number(),

  staffType: t.Union([
    t.Literal(1), // Anaesthetist
    t.Literal(2), // Assistant Surgeon
    t.Literal(3), // Scrub Nurse
    t.Literal(4), // OT Tech
    t.Literal(5), // Nurse
  ]),

  name: t.String(),

  qualification: t.Optional(
    t.String()
  ),

  mobile: t.Optional(
    t.String()
  ),
});