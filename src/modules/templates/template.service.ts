import { db } from "../../db";
import { templates } from "../../db/schema/templates";
import { eq, and } from "drizzle-orm";
import { categories } from "../../db/schema/categories";
import { templateCustomFields } from "../../db/schema/templateCustomFields";

export class TemplateService {
  static async createTemplate(data: any) {
  const result = await db.insert(templates).values({
    doctorId: data.doctorId,

    categoryId: data.categoryId,

    templateName: data.procedureName,

    procedureName: data.procedureName,

    diagnosisTemplate: data.diagnosisTemplate,

    intraoperativeFindings: data.intraoperativeFindings,

    procedureDetailsTemplate: data.procedureDetailsTemplate,
  });

  const templateId = result[0].insertId;

  if (data.customFields && data.customFields.length > 0) {
    await db.insert(templateCustomFields).values(
      data.customFields.map((field: any) => ({
        templateId,

        fieldLabel: field.fieldLabel,

        fieldType: field.fieldType,

        fieldOptions: field.fieldOptions,
      })),
    );
  }

  // ADD THIS BLOCK
 const customFields = await db
  .select()
  .from(templateCustomFields)
  .where(
    eq(
      templateCustomFields.templateId,
      templateId
    )
  );

return {
  id: templateId,

  doctorId: data.doctorId,

  categoryId: data.categoryId,

  templateName: data.procedureName,

  procedureName: data.procedureName,

  diagnosisTemplate: data.diagnosisTemplate,

  intraoperativeFindings: data.intraoperativeFindings,

  procedureDetailsTemplate: data.procedureDetailsTemplate,

  customFields,
};
}

  static async getTemplates(doctorId: number) {
    return await db
      .select({
        id: templates.id,

        doctorId: templates.doctorId,

        categoryId: categories.id,

        category: categories.name,

        templateName: templates.templateName,

        createdAt: templates.createdAt,

        updatedAt: templates.updatedAt,
      })
      .from(templates)
      .leftJoin(categories, eq(categories.id, templates.categoryId))
      .where(eq(templates.doctorId, doctorId));
  }

  static async updateTemplate(
  id: number,
  doctorId: number,
  data: any,
) {

  // Update template

  await db
    .update(templates)
    .set({
      categoryId: data.categoryId,

      templateName: data.procedureName,

      procedureName: data.procedureName,

      diagnosisTemplate: data.diagnosisTemplate,

      intraoperativeFindings:
        data.intraoperativeFindings,

      procedureDetailsTemplate:
        data.procedureDetailsTemplate,
    })
    .where(
      and(
        eq(templates.id, id),
        eq(templates.doctorId, doctorId),
      ),
    );

  // Update custom fields

  if (
    data.customFields &&
    data.customFields.length > 0
  ) {

    for (const field of data.customFields) {

      await db
        .update(templateCustomFields)
        .set({
          fieldLabel: field.fieldLabel,

          fieldType: field.fieldType,

          fieldOptions: field.fieldOptions,
        })
        .where(
          eq(
            templateCustomFields.id,
            field.id,
          ),
        );
    }
  }

  // Return updated template

  return await this.getTemplateById(
    id,
    doctorId,
  );
}

  static async getByCategoryId(doctorId: number, categoryId: number) {
    return await db
      .select({
        id: templates.id,

        templateName: templates.templateName,

        description: templates.description,

        categoryId: templates.categoryId,
      })
      .from(templates)
      .where(
        and(
          eq(templates.doctorId, doctorId),

          eq(templates.categoryId, categoryId),
        ),
      );
  }
  static async getByCategory(doctorId: number, categoryId: number) {
    return await db
      .select()
      .from(templates)
      .where(
        and(
          eq(templates.doctorId, doctorId),
          eq(templates.categoryId, categoryId),
        ),
      );
  }

  static async getDropdown(doctorId: number) {
    return await db
      .select({
        id: templates.id,
        templateName: templates.templateName,
      })
      .from(templates)
      .where(eq(templates.doctorId, doctorId));
  }

  static async getCategories() {
    return await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories);
  }

  static async deleteTemplate(id: number, doctorId: number) {
    const result = await db
      .delete(templates)
      .where(and(eq(templates.id, id), eq(templates.doctorId, doctorId)));

    if (result[0]?.affectedRows === 0) {
      return {
        success: false,
        message: "Template not found",
      };
    }

    return {
      success: true,
      message: "Template deleted successfully",
    };
  }

  static async getTemplateById(
  id: number,
  doctorId: number,
) {

  const template = await db
    .select()
    .from(templates)
    .where(
      and(
        eq(templates.id, id),
        eq(templates.doctorId, doctorId),
      ),
    );

  if (template.length === 0) {
    return {
      success: false,
      message: "Template not found",
    };
  }

  const customFields = await db
    .select()
    .from(templateCustomFields)
    .where(
      eq(templateCustomFields.templateId, id)
    );

  return {
    ...template[0],
    customFields,
  };
}
}
