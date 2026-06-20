import { TemplateService } from "./template.service";

export class TemplateController {
  static async create({ body, store }: any) {
    if (!body.categoryId) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    const data = await TemplateService.createTemplate({
      doctorId: store.user.id,

      categoryId: Number(body.categoryId),

      procedureName: body.procedureName,

      diagnosisTemplate: body.diagnosisTemplate,

      intraoperativeFindings: body.intraoperativeFindings,

      procedureDetailsTemplate: body.procedureDetailsTemplate,

      customFields: body.customFields || [],
    });

    return {
      success: true,
      message: "Template created successfully",
      data,
    };
  }

  static async getAll({ store }: any) {
    const data = await TemplateService.getTemplates(store.user.id);

    return {
      success: true,
      data,
    };
  }

  static async update({ params, body, store }: any) {
    const data = await TemplateService.updateTemplate(
      Number(params.id),
      store.user.id,
      {
        categoryId: Number(body.categoryId),
        procedureName: body.procedureName,

        diagnosisTemplate: body.diagnosisTemplate,

        intraoperativeFindings: body.intraoperativeFindings,

        procedureDetailsTemplate: body.procedureDetailsTemplate,

        customFields: body.customFields || [],
      },
    );

    return {
      success: true,
      message: "Template updated successfully",
      data,
    };
  }

  static async getCategories() {
    const data = await TemplateService.getCategories();

    return {
      success: true,
      data,
    };
  }

  static async getByCategory({ params, store }: any) {
    const data = await TemplateService.getByCategory(
      store.user.id,
      Number(params.categoryId),
    );

    return {
      success: true,
      data,
    };
  }
  static async dropdown({ store }: any) {
    const data = await TemplateService.getDropdown(store.user.id);

    return {
      success: true,
      data,
    };
  }

  static async getByCategoryId({ params, store }: any) {
    const data = await TemplateService.getByCategoryId(
      store.user.id,
      Number(params.categoryId),
    );

    return {
      success: true,
      data,
    };
  }

static async delete({ params, store }: any) {
    const data = await TemplateService.deleteTemplate(
      Number(params.id),
      store.user.id
    );

    return {
      success: data.success,
      message: data.message,
    };
  }


  static async getById({ params, store }: any) {
    const data = await TemplateService.getTemplateById(
      Number(params.id),
      store.user.id,
    );

    if (data.success === false) {
      return data;
    }

    return {
      success: true,
      data,
    };
  }
}
