import { MasterPresetService } from "./masterPreset.service";

export class MasterPresetController {

 static async create({ body, store }: any) {
    try {

        const data =
            await MasterPresetService.createPreset({
                doctorId: store.user.id,
                presetType: body.presetType,
                content: body.content,
            });

        return {
            success: true,
            message: "Preset created successfully",
            data,
        };

    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to create preset."
        };
    }
}

static async getAll({ query, store }: any) {
    try {

        console.log("query =", query);
        console.log("doctorId =", store.user.id);

        const data =
            await MasterPresetService.getPresets(
                store.user.id,
                query.type
            );

        console.log("data =", data);

        return {
            success: true,
            data,
        };

    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to fetch presets."
        };
    }
}

  static async search({ query, store }: any) {
    try {

        const data =
            await MasterPresetService.searchPresets(
                store.user.id,
                query.type,
                query.keyword
            );

        return {
            success: true,
            data,
        };

    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to search presets."
        };
    }
}
 static async update({ params, body, store }: any) {
    try {

        const data =
            await MasterPresetService.updatePreset(
                Number(params.id),
                store.user.id,
                body.content
            );

        return {
            success: true,
            data,
        };

    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to update preset."
        };
    }
}
static async delete({ params, store }: any) {
    try {

        const data =
            await MasterPresetService.deletePreset(
                Number(params.id),
                store.user.id
            );

        return {
            success: true,
            data,
        };

    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to delete preset."
        };
    }
}
}