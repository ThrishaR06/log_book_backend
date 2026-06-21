import { z } from "zod";

export const createSurgeryStaffTypeSchema = z.object({

    name: z.string().min(1),

});

export const updateSurgeryStaffTypeSchema = z.object({

    name: z.string().min(1),

});