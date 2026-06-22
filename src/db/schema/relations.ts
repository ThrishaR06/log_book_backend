import { relations } from "drizzle-orm";

import { surgeryCases } from "./surgeryCases";
import { media } from "./media.schema";

/**
 * 🔹 surgery_cases → media (1 to many)
 */
export const surgeryCasesRelations = relations(surgeryCases, ({ many }) => ({
  media: many(media),
}));

/**
 * 🔹 media → surgery_cases (many to 1)
 */
export const mediaRelations = relations(media, ({ one }) => ({
  surgeryCase: one(surgeryCases, {
    fields: [media.surgeryCaseId],
    references: [surgeryCases.id],
  }),
}));