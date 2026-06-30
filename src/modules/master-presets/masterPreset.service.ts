import { db } from "../../db";
import { masterPresets } from "../../db/schema/masterPresets";
import { eq, and, like } from "drizzle-orm";

export class MasterPresetService {

   static async createPreset(data: any) {
    try {

        const result = await db
            .insert(masterPresets)
            .values({
    doctorId: data.doctorId,
     categoryId: data.categoryId,
    presetType: data.presetType,
    presetText: data.content,
});

        return {
    id: result[0].insertId,
    doctorId: data.doctorId,
    presetType: data.presetType,
    presetText: data.content,
};

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to create preset."
        );
    }
}

    static async getPresets(
    doctorId: number,
    presetType: string
) {
    try {

        return await db
            .select()
            .from(masterPresets)
            .where(
                and(
                    eq(masterPresets.doctorId, doctorId),
                    eq(masterPresets.presetType, presetType)
                )
            );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to fetch presets."
        );
    }
}
    static async searchPresets(
    doctorId: number,
    presetType: string,
    keyword: string
) {
    try {

        return await db
            .select()
            .from(masterPresets)
            .where(
                and(
                    eq(masterPresets.doctorId, doctorId),
                    eq(masterPresets.presetType, presetType),
                    like(masterPresets.presetText, `%${keyword}%`)
                )
            );

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to search presets."
        );
    }
}

    static async updatePreset(
    id: number,
    doctorId: number,
    content: string
) {
    try {

        await db
            .update(masterPresets)
            .set({
    presetText: content,
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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to update preset."
        );
    }
}

   static async deletePreset(
    id: number,
    doctorId: number
) {
    try {

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

    } catch (error: any) {
        throw new Error(
            error.message || "Failed to delete preset."
        );
    }
}
}