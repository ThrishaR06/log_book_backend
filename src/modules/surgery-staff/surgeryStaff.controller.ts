import { SurgeryStaffService } from "./surgeryStaff.service";

export class SurgeryStaffController {

  private service =
    new SurgeryStaffService();

  async create({ body, store }: any) {
    try {

      return await this.service.create({
        ...body,
        doctorId: store.user.id
      });

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async getAll({ store }: any) {
    try {

      return await this.service.getAll(
        store.user.id
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async getById({ params, store }: any) {
    try {

      return await this.service.getById(
        Number(params.id),
        store.user.id
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async update({ params, body, store }: any) {
    try {

      return await this.service.update(
        Number(params.id),
        {
          ...body,
          doctorId: store.user.id
        }
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async delete({ params, store }: any) {
    try {

      return await this.service.delete(
        Number(params.id),
        store.user.id
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async search({ query, store }: any) {
    try {

      return await this.service.search(
        store.user.id,
        String(query.keyword || "")
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async list({ store }: any) {
    try {

      return await this.service.list(
        store.user.id
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

  async listByStaffType({ query, store }: any) {
    try {

      return await this.service.listByStaffType(
        store.user.id,
        Number(query.staffType)
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }
  }

}