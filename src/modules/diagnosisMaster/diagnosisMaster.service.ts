import { DiagnosisMasterRepository }from "./diagnosisMaster.repository";

export class DiagnosisMasterService {

  private repository =
    new DiagnosisMasterRepository();

  async create(body: any) {

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

    const id =
      await this.repository.create(body);

    return this.repository.findById(id);
  }

  async getAll(data: any) {

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

    return this.repository.findAll();
  }

  async update(
    id: number,
    body: any
  ) {

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
      body
    );

    return this.repository.findById(id);
  }

  async delete(id: number) {

    await this.repository.delete(id);

    return {
      success: true,
      message: "Diagnosis deleted successfully"
    };
  }

  async search(data: any) {

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

    return this.repository.search(
      data.keyword
    );
  }
}