import { relations } from "drizzle-orm";

import { surgeryCases } from "./surgeryCases";
import { media } from "./media.schema";
import { roles } from "./roles";
import { doctors } from "./doctors";

import { admins } from "./admins";


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

export const doctorsRelations = relations(
  doctors,
  ({ one }) => ({
    role: one(roles, {
      fields: [doctors.roleId],
      references: [roles.id],
    }),
  })
);

export const rolesRelations = relations(
  roles,
  ({ many }) => ({
    doctors: many(doctors),
  })
);

export const adminsRelations = relations(
  admins,
  ({ one }) => ({
    role: one(roles, {
      fields: [admins.roleId],
      references: [roles.id],
    }),
  })
);