import { t } from "elysia";

export const saveClinicalSelectionSchema =
t.Object({

  surgeryId: t.Number(),

  anaesthesiaId: t.Optional(t.Number()),

  positionId: t.Optional(t.Number()),

  incisionId: t.Optional(t.Number()),

  categoryId: t.Optional(t.Number()),

  procedureId: t.Optional(t.Number()),

  sideId: t.Optional(t.Number()),

  tumourTypeId: t.Optional(t.Number()),

  approachId: t.Optional(t.Number()),

  staffIds: t.Array(
    t.Number()
  )
});