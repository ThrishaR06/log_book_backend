import { z } from "zod";

export const createSpecialInstructionSchema = z.object({

    categoryId: z.number(),

    specialInstruction: z.string().min(1),

});

export const updateSpecialInstructionSchema = z.object({

    categoryId: z.number(),

    specialInstruction: z.string().min(1),

});