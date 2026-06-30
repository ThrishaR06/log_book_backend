import { OperativeFindingsRepository } from "./operativeFindings.repository";

export class OperativeFindingsService {

  private repository =
    new OperativeFindingsRepository();

  async create(body: any) {
    try {

      const isValid =
        await this.repository.validateDoctorCategory(
          body.doctorId,
          body.categoryId
        );

      if (!isValid) {
        return {
          success: false,
          message: "Category not found."
        };
      }

      const id = await this.repository.create(body);

      return this.repository.findById(
  id,
  body.doctorId
);

    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async getAll(data: any) {
    try {

      const isValid =
        await this.repository.validateDoctorCategory(
          data.doctorId,
          data.categoryId
        );

      if (!isValid) {
        return {
          success: false,
          message: "Category not found."
        };
      }

      return await this.repository.findAll(
  data.doctorId,
  data.categoryId
);

    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async update(id: number, body: any) {
    try {

      const isValid =
        await this.repository.validateDoctorCategory(
          body.doctorId,
          body.categoryId
        );

      if (!isValid) {
        return {
          success: false,
          message: "Category not found."
        };
      }

      await this.repository.update(
  id,
  body.doctorId,
  body
);

    return this.repository.findById(
  id,
  body.doctorId
);

    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async delete(
  id: number,
  doctorId: number
) {
    try {

      await this.repository.delete(
  id,
  doctorId
);

      return {
        success: true,
        message: "Operative Finding deleted successfully"
      };

    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async search(data: any) {
    try {

      const isValid =
        await this.repository.validateDoctorCategory(
          data.doctorId,
          data.categoryId
        );

      if (!isValid) {
        return {
          success: false,
          message: "Category not found."
        };
      }

      return await this.repository.search(
  data.keyword,
  data.doctorId,
  data.categoryId
);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

}