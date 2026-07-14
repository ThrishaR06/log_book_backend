import { db, pool } from "../../db";
import { businessSettings } from "../../db/schema/businessSettings";
import { ApiResponse } from "../../utils/apiResponse";
import { and, eq } from "drizzle-orm";
import { uploadToS3 } from "../../utils/s3Upload";
import { getImageUrl } from "../../utils/s3Url";

export class BusinessSettingService {

    // ==========================
    // SAVE (LOGO + COLOR)
    // ==========================
    static async save({
        doctorId,
        logo,
        color,
    }: {
        doctorId: number;
        logo?: any;
        color?: string;
    }) {

        // Fetch logged in doctor
        const doctor = await this.getDoctorById(doctorId);

        // ==========================
        // LOGO
        // ==========================
        if (logo) {

            const uploaded = await uploadToS3(
                logo,
                "business-settings/logo",
                doctor.full_name
            );

            await this.upsertSetting(
                doctorId,
                "logo",
                uploaded.key
            );

        }

        // ==========================
        // COLOR
        // ==========================
        if (color) {

            await this.upsertSetting(
                doctorId,
                "color",
                color
            );

        }

        // Fetch latest settings
const settings = await db
    .select()
    .from(businessSettings)
    .where(
        eq(
            businessSettings.doctorId,
            doctorId
        )
    );

for (const item of settings) {

    if (
        item.settingKey === "logo" &&
        item.settingValue
    ) {

        logo = await getImageUrl(
            item.settingValue
        );

    }

    if (
        item.settingKey === "color"
    ) {

        color = item.settingValue;

    }

}

return ApiResponse.success(
    {
        logo,
        color,
    },
    "Business settings saved successfully."
);

    }

    // ==========================
    // UPSERT SETTING
    // ==========================
    private static async upsertSetting(
        doctorId: number,
        key: string,
        value: string
    ) {

        const [existing] = await db
            .select()
            .from(businessSettings)
            .where(
                and(
                    eq(businessSettings.doctorId, doctorId),
                    eq(businessSettings.settingKey, key)
                )
            );

        // ==========================
        // UPDATE
        // ==========================
        if (existing) {

            await db
                .update(businessSettings)
                .set({
                    settingValue: value,
                })
                .where(
                    eq(
                        businessSettings.id,
                        existing.id
                    )
                );

            return;
        }

        // ==========================
        // INSERT
        // ==========================
        await db
            .insert(businessSettings)
            .values({
                doctorId,
                settingKey: key,
                settingValue: value,
            });

    }

        // ==========================
    // GET ALL
    // ==========================
    static async getAll({
        doctorId,
    }: {
        doctorId: number;
    }) {

        const settings = await db
    .select()
    .from(businessSettings)
    .where(
        eq(
            businessSettings.doctorId,
            doctorId
        )
    );

let logo: string | null = null;
let color: string | null = null;

for (const item of settings) {

    if (
        item.settingKey === "logo" &&
        item.settingValue
    ) {

        logo = await getImageUrl(
            item.settingValue
        );

    }

    if (
        item.settingKey === "color"
    ) {

        color = item.settingValue;

    }

}

return ApiResponse.success(
    {
        logo,
        color,
    },
    "Business settings fetched successfully."
);
    }

    // ==========================
    // GET DOCTOR BY ID
    // ==========================
    private static async getDoctorById(
        id: number
    ) {

        const [rows]: any = await pool.query(
            `
            SELECT
                id,
                full_name
            FROM doctors
            WHERE id = ?
            `,
            [id]
        );

        if (!rows.length) {

            throw new Error(
                "Doctor not found."
            );

        }

        return rows[0];

    }

}