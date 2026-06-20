import { t } from "elysia";

export const createSurgeryImageSchema =
t.Object({

  surgeryId: t.Number(),

  imageType: t.Union([
    t.Literal("PRE_OP"),
    t.Literal("INTRA_OP"),
    t.Literal("POST_OP")
  ]),

  fileUrl: t.String()
});