import { z } from "zod";

export const createDietSchema = z.object({

    dietInstruction: z.string().min(1),

});

export const updateDietSchema = z.object({

    categoryId: z.number(),

    dietInstruction: z.string().min(1),

});