import { z } from "zod";

export const createDrainManagementSchema = z.object({

    categoryId: z.number(),

    drainInstruction: z.string().min(1),

});

export const updateDrainManagementSchema = z.object({

    categoryId: z.number(),

    drainInstruction: z.string().min(1),

});