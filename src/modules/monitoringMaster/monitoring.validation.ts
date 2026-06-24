import { z } from "zod";

export const createMonitoringSchema = z.object({

    categoryId: z.number(),

    monitoringInstruction: z.string().min(1),

});

export const updateMonitoringSchema = z.object({

    categoryId: z.number(),

    monitoringInstruction: z.string().min(1),

});