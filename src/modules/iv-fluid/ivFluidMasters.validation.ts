import { z } from "zod";

export const createIvFluidSchema = z.object({

    categoryId: z.number(),

    fluidName: z.string().min(1),

    defaultRate: z.string().optional(),

    notes: z.string().optional(),

});

export const updateIvFluidSchema = z.object({

    categoryId: z.number(),

    fluidName: z.string().min(1),

    defaultRate: z.string().optional(),

    notes: z.string().optional(),

});