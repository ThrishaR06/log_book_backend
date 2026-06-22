import { z } from "zod";

export const createWoundCareSchema = z.object({

    categoryId: z.number(),

    woundInstruction: z.string().min(1),

});

export const updateWoundCareSchema = z.object({

    categoryId: z.number(),

    woundInstruction: z.string().min(1),

});