import { z } from "zod";

export const createMasterPresetSchema = z.object({
    presetType: z.string().min(1),
    content: z.string().min(1),
});

export const updateMasterPresetSchema = z.object({
    content: z.string().min(1),
});