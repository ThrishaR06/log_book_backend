import { relations } from "drizzle-orm";

import { surgeryCases } from "./surgeryCases";
import { media } from "./media.schema";
import { roles } from "./roles";
import { doctors } from "./doctors";

import { admins } from "./admins";


/**
 * 🔹 surgery_cases → media (1 to many)
 */
import { anaesthesiaMasters } from "./anaesthesiaMasters";
import { positionMasters } from "./positionMasters";
import { incisionMasters } from "./incisionMasters";


export const surgeryCasesRelations = relations(
    surgeryCases,
    ({ many, one }) => ({
        media: many(media),

        anaesthesia: one(anaesthesiaMasters, {
            fields: [surgeryCases.anaesthesiaId],
            references: [anaesthesiaMasters.id],
        }),

        position: one(positionMasters, {
            fields: [surgeryCases.positionId],
            references: [positionMasters.id],
        }),

        incision: one(incisionMasters, {
            fields: [surgeryCases.incisionId],
            references: [incisionMasters.id],
        }),
    })
);

export const anaesthesiaRelations = relations(
  anaesthesiaMasters,
  ({ many }) => ({
    surgeryCases: many(surgeryCases),
  })
);

export const positionRelations = relations(
  positionMasters,
  ({ many }) => ({
    surgeryCases: many(surgeryCases),
  })
);

export const incisionRelations = relations(
  incisionMasters,
  ({ many }) => ({
    surgeryCases: many(surgeryCases),
  })
);

/**
 * 🔹 media → surgery_cases (many to 1)
 */
export const mediaRelations = relations(media, ({ one }) => ({
  surgeryCase: one(surgeryCases, {
    fields: [media.surgeryCaseId],
    references: [surgeryCases.surgeryId],
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

