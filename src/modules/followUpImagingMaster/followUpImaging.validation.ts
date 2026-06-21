import { z } from "zod";

export const createFollowUpImagingSchema = z.object({

    categoryId: z.number(),

    followUpImagingInstruction: z.string().min(1),

});

export const updateFollowUpImagingSchema = z.object({

    categoryId: z.number(),

    followUpImagingInstruction: z.string().min(1),

});