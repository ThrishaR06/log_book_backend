import { db } from "../../db";
import { followUpImagingMasters } from "../../db/schema/followUpImagingMasters";
import { eq, and, like } from "drizzle-orm";

export class FollowUpImagingMasterService {

    static async create(data: any) {

        const result = await db
            .insert(followUpImagingMasters)
            .values({
                doctorId: data.doctorId,
                categoryId: data.categoryId,
                followUpImagingInstruction:
                    data.followUpImagingInstruction,
            });

        return {
            id: result[0].insertId,
            ...data,
        };
    }

    static async getAll(
        doctorId: number,
        categoryId: number
    ) {

        return await db
            .select()
            .from(followUpImagingMasters)
            .where(
                and(
                    eq(
                        followUpImagingMasters.doctorId,
                        doctorId
                    ),
                    eq(
                        followUpImagingMasters.categoryId,
                        categoryId
                    )
                )
            );
    }

    static async search(
        doctorId: number,
        categoryId: number,
        keyword: string
    ) {

        return await db
            .select()
            .from(followUpImagingMasters)
            .where(
                and(
                    eq(
                        followUpImagingMasters.doctorId,
                        doctorId
                    ),
                    eq(
                        followUpImagingMasters.categoryId,
                        categoryId
                    ),
                    like(
                        followUpImagingMasters.followUpImagingInstruction,
                        `%${keyword}%`
                    )
                )
            );
    }

    static async update(
        id: number,
        doctorId: number,
        body: any
    ) {

        await db
            .update(followUpImagingMasters)
            .set({
                categoryId: body.categoryId,
                followUpImagingInstruction:
                    body.followUpImagingInstruction,
            })
            .where(
                and(
                    eq(followUpImagingMasters.id, id),
                    eq(
                        followUpImagingMasters.doctorId,
                        doctorId
                    )
                )
            );

        return {
            message:
                "Follow Up Imaging updated successfully",
        };
    }

    static async delete(
        id: number,
        doctorId: number,
        categoryId: number
    ) {

        await db
            .delete(followUpImagingMasters)
            .where(
                and(
                    eq(followUpImagingMasters.id, id),
                    eq(
                        followUpImagingMasters.doctorId,
                        doctorId
                    ),
                    eq(
                        followUpImagingMasters.categoryId,
                        categoryId
                    )
                )
            );

        return {
            message:
                "Follow Up Imaging deleted successfully",
        };
    }

}