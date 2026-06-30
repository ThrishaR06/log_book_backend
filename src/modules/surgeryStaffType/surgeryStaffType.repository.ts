import { db } from "../../db";
import { surgeryStaffTypes } from "../../db/schema/surgeryStaffTypes";
import { eq, like } from "drizzle-orm";

export class SurgeryStaffTypeRepository {

    static async create(data: any) {

    try {

        const result = await db
            .insert(surgeryStaffTypes)
            .values({
                name: data.name,
            });

        return {
            id: result[0].insertId,
            ...data,
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Database error while creating surgery staff type."
        );

    }

}

    static async getAll() {

    try {

        return await db
            .select()
            .from(surgeryStaffTypes);

    } catch (error: any) {

        throw new Error(
            error.message || "Database error while fetching surgery staff types."
        );

    }

}

    static async search(keyword: string) {

    try {

        return await db
            .select()
            .from(surgeryStaffTypes)
            .where(
                like(
                    surgeryStaffTypes.name,
                    `%${keyword}%`
                )
            );

    } catch (error: any) {

        throw new Error(
            error.message || "Database error while searching surgery staff types."
        );

    }

}

   static async getById(id: number) {

    try {

        const result = await db
            .select()
            .from(surgeryStaffTypes)
            .where(
                eq(surgeryStaffTypes.id, id)
            );

        return result[0];

    } catch (error: any) {

        throw new Error(
            error.message || "Database error while fetching surgery staff type."
        );

    }

}

    static async update(
    id: number,
    body: any
) {

    try {

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

    } catch (error: any) {

        throw new Error(
            error.message || "Database error while updating surgery staff type."
        );

    }

}

    static async delete(id: number) {

    try {

        await db
            .delete(surgeryStaffTypes)
            .where(
                eq(surgeryStaffTypes.id, id)
            );

        return {
            message: "Surgery Staff Type deleted successfully",
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Database error while deleting surgery staff type."
        );

    }

}

}