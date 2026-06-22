import { db } from "../../db";
import { surgeryStaffTypes } from "../../db/schema/surgeryStaffTypes";
import { eq, like } from "drizzle-orm";

export class SurgeryStaffTypeRepository {

    static async create(data: any) {

        const result = await db
            .insert(surgeryStaffTypes)
            .values({
                name: data.name,
            });

        return {
            id: result[0].insertId,
            ...data,
        };
    }

    static async getAll() {

        return await db
            .select()
            .from(surgeryStaffTypes);

    }

    static async search(keyword: string) {

        return await db
            .select()
            .from(surgeryStaffTypes)
            .where(
                like(
                    surgeryStaffTypes.name,
                    `%${keyword}%`
                )
            );

    }

    static async getById(id: number) {

        const result = await db
            .select()
            .from(surgeryStaffTypes)
            .where(
                eq(surgeryStaffTypes.id, id)
            );

        return result[0];

    }

    static async update(
        id: number,
        body: any
    ) {

        await db
            .update(surgeryStaffTypes)
            .set({
                name: body.name,
            })
            .where(
                eq(surgeryStaffTypes.id, id)
            );

        return {
            message: "Surgery Staff Type updated successfully",
        };
    }

    static async delete(id: number) {

        await db
            .delete(surgeryStaffTypes)
            .where(
                eq(surgeryStaffTypes.id, id)
            );

        return {
            message: "Surgery Staff Type deleted successfully",
        };
    }

}