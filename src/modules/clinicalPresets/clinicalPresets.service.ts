import { db } from "../../db";

import { medicationMasters }
from "../../db/schema/medicationMasters";

import { ivFluidMasters }
from "../../db/schema/ivFluidMasters";

import { masterPresets }
from "../../db/schema/masterPresets";

import { categories }
from "../../db/schema/categories";

import {
    and,
    eq
} from "drizzle-orm";

export class ClinicalPresetsService {

    static async getAll(
        doctorId: number,
        categoryId: number
    ) {

        const [category] = await db
            .select()
            .from(categories)
            .where(
                and(
                    eq(categories.id, categoryId),
                    eq(categories.doctorId, doctorId)
                )
            );

        if (!category) {
            return {
                success: false,
                message: "Category does not belong to this doctor."
            };
        }

        const medications =
            await db
                .select()
                .from(medicationMasters)
                .where(
                    and(
                        eq(
                            medicationMasters.doctorId,
                            doctorId
                        ),
                        eq(
                            medicationMasters.categoryId,
                            categoryId
                        )
                    )
                );

        const ivFluids =
            await db
                .select()
                .from(ivFluidMasters)
                .where(
                    and(
                        eq(
                            ivFluidMasters.doctorId,
                            doctorId
                        ),
                        eq(
                            ivFluidMasters.categoryId,
                            categoryId
                        )
                    )
                );

        const textPresets =
            await db
                .select()
                .from(masterPresets)
                .where(
                    and(
                        eq(
                            masterPresets.doctorId,
                            doctorId
                        ),
                        eq(
                            masterPresets.categoryId,
                            categoryId
                        )
                    )
                );

        return {
            category: {
                id: category.id,
                name: category.name
            },
            medications,
            ivFluids,
            textPresets
        };
    }

}