import { db } from "../../db";
import { masterPresets } from "../../db/schema/masterPresets";
import { eq, and, like } from "drizzle-orm";

export class MasterPresetService {

    static async createPreset(data: any) {

        const result = await db
            .insert(masterPresets)
            .values({
                doctorId: data.doctorId,
                presetType: data.presetType,
                content: data.content,
            });

        return {
            id: result[0].insertId,
            doctorId: data.doctorId,
            presetType: data.presetType,
            content: data.content,
        };
    }

    static async getPresets(
        doctorId: number,
        presetType: string
    ) {

        return await db
            .select()
            .from(masterPresets)
            .where(
                and(
                    eq(masterPresets.doctorId, doctorId),
                    eq(masterPresets.presetType, presetType)
                )
            );
    }

    static async searchPresets(
        doctorId: number,
        presetType: string,
        keyword: string
    ) {

        return await db
            .select()
            .from(masterPresets)
            .where(
                and(
                    eq(masterPresets.doctorId, doctorId),
                    eq(masterPresets.presetType, presetType),
                    like(masterPresets.content, `%${keyword}%`)
                )
            );
    }

    static async updatePreset(
        id: number,
        doctorId: number,
        content: string
    ) {

        await db
            .update(masterPresets)
            .set({
                content,
            })
            .where(
                and(
                    eq(masterPresets.id, id),
                    eq(masterPresets.doctorId, doctorId)
                )
            );

        return {
            message: "Preset updated successfully",
        };
    }

    static async deletePreset(
        id: number,
        doctorId: number
    ) {

        await db
            .delete(masterPresets)
            .where(
                and(
                    eq(masterPresets.id, id),
                    eq(masterPresets.doctorId, doctorId)
                )
            );

        return {
            message: "Preset deleted successfully",
        };
    }
}