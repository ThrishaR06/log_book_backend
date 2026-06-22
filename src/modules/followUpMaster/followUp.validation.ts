import { z } from "zod";

export const createFollowUpSchema = z.object({

    categoryId: z.number(),

    followUpInstruction: z.string().min(1),

});

export const updateFollowUpSchema = z.object({

    categoryId: z.number(),

    followUpInstruction: z.string().min(1),

});