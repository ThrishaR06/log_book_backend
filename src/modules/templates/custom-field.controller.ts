import { CustomFieldService } from "./custom-field.service";

export class CustomFieldController {

  static async create({ body }: any) {

    const data = await CustomFieldService.create({
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
  }

  static async update({ params, body }: any) {

    await CustomFieldService.update(
      Number(params.id),
      {
        fieldLabel: body.fieldLabel,
        fieldType: body.fieldType,
        fieldOptions: body.fieldOptions,
      }
    );

    return {
      success: true,
      message: "Custom field updated successfully",
    };
  }

  static async delete({ params }: any) {

    const data =
      await CustomFieldService.delete(
        Number(params.id)
      );

    return {
      success: data.success,
      message: data.message,
    };
  }
}