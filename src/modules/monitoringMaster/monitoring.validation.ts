import { z } from "zod";

export const createMonitoringSchema = z.object({
    monitoringInstruction: z.string().min(1),
});

export const updateMonitoringSchema = z.object({
    monitoringInstruction: z.string().min(1),
});