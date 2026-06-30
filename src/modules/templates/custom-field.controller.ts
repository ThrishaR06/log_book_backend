import { CustomFieldService } from "./custom-field.service";

export class CustomFieldController {

  static async create({ body, store }: any) {

    try {

      const data = await CustomFieldService.create({
        doctorId: store.user.id,
        templateId: Number(body.templateId),
        fieldLabel: body.fieldLabel,
        fieldType: body.fieldType,
        fieldOptions: body.fieldOptions,
      });

      return {
        success: true,
        message: "Custom field created successfully",
        data,
      };

    } catch (error: any) {

      return {
        success: false,
        message: error.message,
      };

    }

  }

  static async update({ params, body, store }: any) {

    try {

      const data = await CustomFieldService.update(
        Number(params.id),
        {
          doctorId: store.user.id,
          fieldLabel: body.fieldLabel,
          fieldType: body.fieldType,
          fieldOptions: body.fieldOptions,
        }
      );

      return {
  success: true,
  message: "Custom field updated successfully",
  data,
};

    } catch (error: any) {

      return {
        success: false,
        message: error.message,
      };

    }

  }

  static async delete({ params, store }: any) {

    try {

      const data =
        await CustomFieldService.delete(
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
        message: error.message,
      };

    }

  }

}