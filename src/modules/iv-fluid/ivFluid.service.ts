import { db } from "../../db";
import { ivFluidMasters } from "../../db/schema/ivFluidMasters";
import { eq, and, like } from "drizzle-orm";

export class IvFluidMasterService {

    static async create(data: any) {

        const result = await db
            .insert(ivFluidMasters)
            .values({
                doctorId: data.doctorId,
                fluidName: data.fluidName,
                defaultRate: data.defaultRate,
                notes: data.notes,
            });

        return {
            id: result[0].insertId,
            ...data,
        };
    }

    static async getAll(doctorId: number) {

        return await db
            .select()
            .from(ivFluidMasters)
            .where(
                eq(ivFluidMasters.doctorId, doctorId)
            );
    }

    static async search(
        doctorId: number,
        keyword: string
    ) {

        return await db
            .select()
            .from(ivFluidMasters)
            .where(
                and(
                    eq(ivFluidMasters.doctorId, doctorId),
                    like(
                        ivFluidMasters.fluidName,
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
            .update(ivFluidMasters)
            .set({
                fluidName: body.fluidName,
                defaultRate: body.defaultRate,
                notes: body.notes,
            })
            .where(
                and(
                    eq(ivFluidMasters.id, id),
                    eq(ivFluidMasters.doctorId, doctorId)
                )
            );

        return {
            message: "IV Fluid updated successfully",
        };
    }

    static async delete(
        id: number,
        doctorId: number
    ) {

        await db
            .delete(ivFluidMasters)
            .where(
                and(
                    eq(ivFluidMasters.id, id),
                    eq(ivFluidMasters.doctorId, doctorId)
                )
            );

        return {
            message: "IV Fluid deleted successfully",
        };
    }
}