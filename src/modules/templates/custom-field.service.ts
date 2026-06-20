import { db } from "../../db";
import { eq } from "drizzle-orm";
import { templateCustomFields } from "../../db/schema/templateCustomFields";

export class CustomFieldService {

  static async create(data: any) {

    const result = await db
      .insert(templateCustomFields)
      .values({
        templateId: data.templateId,
        fieldLabel: data.fieldLabel,
        fieldType: data.fieldType,
        fieldOptions: data.fieldOptions,
      });

    return {
      id: result[0].insertId,
    };
  }

  static async update(
    id: number,
    data: any,
  ) {

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
  }

  static async delete(id: number) {

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
  }
}