import { TemplateService } from "./template.service";

export class TemplateController {

  static async create({ body, store }: any) {

    try {

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

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  // ==========================
  // GET ALL TEMPLATE LIST
  // ==========================
  static async getAllTemplateList({ store }: any) {

  try {

    console.log("Doctor ID =", store.user.id);

    const data =
      await TemplateService.getAllTemplateList(
        store.user.id
      );

    return {
      success: true,
      message: "Template list fetched successfully",
      data,
    };

  } catch (error: any) {

    console.log(error);

    return {
      success: false,
      message: error.message,
    };

  }

}

  static async getAll({ store }: any) {

    try {

      const data =
        await TemplateService.getTemplates(
          store.user.id
        );

      return {
        success: true,
        data,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async update({ params, body, store }: any) {

    try {

      const data =
        await TemplateService.updateTemplate(
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

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async getCategories() {

    try {

      const data =
        await TemplateService.getCategories();

      return {
        success: true,
        data,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async getByCategory({ params, store }: any) {

    try {

      const data =
        await TemplateService.getByCategory(
          store.user.id,
          Number(params.categoryId),
        );

      return {
        success: true,
        data,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async dropdown({ store }: any) {

    try {

      const data =
        await TemplateService.getDropdown(
          store.user.id
        );

      return {
        success: true,
        data,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async getByCategoryId({ params, store }: any) {

    try {

      const data =
        await TemplateService.getByCategoryId(
          store.user.id,
          Number(params.categoryId),
        );

      return {
        success: true,
        data,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async delete({ params, store }: any) {

    try {

      const data =
        await TemplateService.deleteTemplate(
          Number(params.id),
          store.user.id
        );

      return {
        success: data.success,
        message: data.message,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

  static async getById({ params, store }: any) {

    try {

      const data =
        await TemplateService.getTemplateById(
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

    } catch (error: any) {

      return {
        success: false,
        message: error.message || "Something went wrong",
      };

    }

  }

}