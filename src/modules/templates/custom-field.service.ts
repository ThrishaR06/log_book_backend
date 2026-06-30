import { db } from "../../db";
import { eq } from "drizzle-orm";
import { templateCustomFields } from "../../db/schema/templateCustomFields";

export class CustomFieldService {

  static async create(data: any) {

    try {

      const result = await db
        .insert(templateCustomFields)
        .values({
          templateId: data.templateId,
          fieldLabel: data.fieldLabel,
          fieldType: data.fieldType,
          fieldOptions: data.fieldOptions,
        });

      const insertedId = result[0]?.insertId;

      const [created] = await db
        .select()
        .from(templateCustomFields)
        .where(
          eq(
            templateCustomFields.id,
            insertedId
          )
        );

      return created;

    } catch (error) {

      throw error;

    }

  }

  static async update(
    id: number,
    data: any,
  ) {

    try {

      await db
        .update(templateCustomFields)
        .set({
          fieldLabel: data.fieldLabel,
          fieldType: data.fieldType,
          fieldOptions: data.fieldOptions,
        })
        .where(
          eq(
            templateCustomFields.id,
            id
          )
        );

    } catch (error) {

      throw error;

    }

  }

  static async delete(id: number) {

    try {

      const result = await db
        .delete(templateCustomFields)
        .where(
          eq(
            templateCustomFields.id,
            id
          )
        );

      if (
        result[0]?.affectedRows === 0
      ) {
        return {
          success: false,
          message: "Custom field not found",
        };
      }

      return {
        success: true,
        message: "Custom field deleted successfully",
      };

    } catch (error) {

      throw error;

    }

  }

}