import { db } from "../../db";
import { templates } from "../../db/schema/templates";
import { eq, and, count } from "drizzle-orm";
import { categories } from "../../db/schema/categories";
import { templateCustomFields } from "../../db/schema/templateCustomFields";
import { SubscriptionLimitService } from "../subscription/subscriptionLimit.service";

export class TemplateService {

  static async createTemplate(data: any) {

    try {

      // Verify category belongs to logged-in doctor
      const [category] = await db
        .select()
        .from(categories)
        .where(
          and(
            eq(categories.id, data.categoryId),
            eq(categories.doctorId, data.doctorId)
          )
        );

      if (!category) {
        return {
          success: false,
          message: "Category not found.",
        };
      }

      // ==========================
// CHECK TEMPLATE LIMIT
// ==========================

const [templateCount] = await db
    .select({
        total: count(),
    })
    .from(templates)
    .where(
        eq(
            templates.doctorId,
            data.doctorId
        )
    );

await SubscriptionLimitService.validateTemplateLimit(
    data.doctorId,
    templateCount.total
);

      const result = await db.insert(templates).values({
        doctorId: data.doctorId,
        categoryId: data.categoryId,
        procedureName: data.procedureName,
        diagnosisTemplate: data.diagnosisTemplate,
        intraoperativeFindings: data.intraoperativeFindings,
        procedureDetailsTemplate: data.procedureDetailsTemplate,
      });

      const templateId = result[0].insertId;

      if (
        data.customFields &&
        data.customFields.length > 0
      ) {

        await db
          .insert(templateCustomFields)
          .values(

            data.customFields.map(
              (field: any) => ({

                templateId,

                fieldLabel:
                  field.fieldLabel,

                fieldType:
                  field.fieldType,

                fieldOptions:
                  field.fieldOptions,

              })
            ),

          );

      }

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


        procedureName: data.procedureName,

        diagnosisTemplate:
          data.diagnosisTemplate,

        intraoperativeFindings:
          data.intraoperativeFindings,

        procedureDetailsTemplate:
          data.procedureDetailsTemplate,

        customFields,

      };

    } catch (error) {

      throw error;

    }

  }

static async getTemplates(
  doctorId: number
) {

  try {

    return await db
      .select({

        id: templates.id,

        doctorId:
          templates.doctorId,

        categoryId:
          categories.id,

        category:
          categories.name,

        procedureName:
          templates.procedureName,

        createdAt:
          templates.createdAt,

        updatedAt:
          templates.updatedAt,

      })
      .from(templates)
      .leftJoin(
        categories,
        eq(
          categories.id,
          templates.categoryId
        )
      )
      .where(
        eq(
          templates.doctorId,
          doctorId
        )
      );

  } catch (error: any) {

    throw new Error(
      error.message ||
      "Failed to fetch templates."
    );

  }

}
    static async updateTemplate(
    id: number,
    doctorId: number,
    data: any,
  ) {

    try {

      // Verify category belongs to logged-in doctor
      const [category] = await db
        .select()
        .from(categories)
        .where(
          and(
            eq(categories.id, data.categoryId),
            eq(categories.doctorId, doctorId)
          )
        );

      if (!category) {
        return {
          success: false,
          message: "Category not found.",
        };
      }

      // Update template
      await db
        .update(templates)
        .set({
          categoryId: data.categoryId,


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

    } catch (error) {

      throw error;

    }

  }

  static async getByCategoryId(
    doctorId: number,
    categoryId: number,
  ) {

    try {

      // Verify category belongs to logged-in doctor
      const [category] = await db
        .select()
        .from(categories)
        .where(
          and(
            eq(categories.id, categoryId),
            eq(categories.doctorId, doctorId),
          ),
        );

      if (!category) {
        return {
          success: false,
          message: "Category not found.",
        };
      }

      // Fetch templates
      const templateList = await db
        .select({
          id: templates.id,

          categoryId: templates.categoryId,

          procedureName:
            templates.procedureName,

          diagnosisTemplate:
            templates.diagnosisTemplate,

          intraoperativeFindings:
            templates.intraoperativeFindings,

          procedureDetailsTemplate:
            templates.procedureDetailsTemplate,
        })
        .from(templates)
        .where(
          and(
            eq(templates.doctorId, doctorId),
            eq(templates.categoryId, categoryId),
          ),
        );

      // Fetch custom fields for each template
      const result = await Promise.all(

        templateList.map(async (template) => {

          const customFields = await db
            .select({
              id: templateCustomFields.id,

              fieldLabel:
                templateCustomFields.fieldLabel,

              fieldType:
                templateCustomFields.fieldType,

              fieldOptions:
                templateCustomFields.fieldOptions,
            })
            .from(templateCustomFields)
            .where(
              eq(
                templateCustomFields.templateId,
                template.id,
              ),
            );

          return {
            ...template,
            customFields,
          };

        }),

      );

      return result;

    } catch (error) {

      throw error;

    }

  }

  static async getByCategory(
    doctorId: number,
    categoryId: number
  ) {

    try {

      // Verify category belongs to logged-in doctor
      const [category] = await db
        .select()
        .from(categories)
        .where(
          and(
            eq(categories.id, categoryId),
            eq(categories.doctorId, doctorId)
          )
        );

      if (!category) {
        return {
          success: false,
          message: "Category not found.",
        };
      }

      return await db
        .select()
        .from(templates)
        .where(
          and(
            eq(templates.doctorId, doctorId),
            eq(templates.categoryId, categoryId),
          ),
        );

    } catch (error) {

      throw error;

    }

  }

  static async getDropdown(
    doctorId: number
  ) {

    try {

      return await db
        .select({

          id: templates.id,

          procedureName: templates.procedureName

        })
        .from(templates)
        .where(
          eq(
            templates.doctorId,
            doctorId
          )
        );

    } catch (error) {

      throw error;

    }

  }  static async deleteTemplate(
    id: number,
    doctorId: number
  ) {

    try {

      const result = await db
        .delete(templates)
        .where(
          and(
            eq(templates.id, id),
            eq(templates.doctorId, doctorId)
          )
        );

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

    } catch (error) {

      throw error;

    }

  }

  static async getTemplateById(
    id: number,
    doctorId: number,
  ) {

    try {

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
          eq(
            templateCustomFields.templateId,
            id
          )
        );

      return {
        ...template[0],
        customFields,
      };

    } catch (error) {

      throw error;

    }

  }

  // ==========================
  // GET ALL TEMPLATES WITH CUSTOM FIELDS
  // ==========================
 static async getAllTemplateList(
  doctorId: number
) {

  try {

    const templateList = await db
      .select({

        id: templates.id,

        doctorId: templates.doctorId,

        categoryId: templates.categoryId,

        categoryName: categories.name,


        procedureName: templates.procedureName,

        diagnosisTemplate:
          templates.diagnosisTemplate,

        intraoperativeFindings:
          templates.intraoperativeFindings,

        procedureDetailsTemplate:
          templates.procedureDetailsTemplate,

        createdAt: templates.createdAt,

        updatedAt: templates.updatedAt,

      })
      .from(templates)
      .leftJoin(
        categories,
        eq(categories.id, templates.categoryId)
      )
      .where(
        eq(
          templates.doctorId,
          doctorId
        )
      );

    const result = await Promise.all(

      templateList.map(async (template) => {

        const customFields = await db
          .select()
          .from(templateCustomFields)
          .where(
            eq(
              templateCustomFields.templateId,
              template.id
            )
          );

        return {
          ...template,
          customFields,
        };

      })

    );

    return result;

  } catch (error) {

    throw error;

  }

}

}