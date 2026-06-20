import { IncisionRepository } from "./incision.repository";

export class IncisionService {

  private repository =
    new IncisionRepository();

  async create(data: any) {

    const id =
      await this.repository.create(data);

    return {
      success: true,
      message: "Incision created successfully",
      data: { id }
    };
  }

  async getAll(doctorId: number) {

    return {
      success: true,
      message: "Incision fetched successfully",
      data: await this.repository.findAll(doctorId)
    };
  }

  async list(
  doctorId: number,
  categoryId: number
) {

  const data = await this.repository.list(
    doctorId,
    categoryId
  );

  return {
    success: true,
    message: "Incisions fetched successfully",
    data
  };
}

  async getById(id: number) {

    return {
      success: true,
      message: "Incision fetched successfully",
      data: await this.repository.findById(id)
    };
  }

  async update(id: number, data: any) {

    await this.repository.update(id, data);

    return {
      success: true,
      message: "Incision updated successfully"
    };
  }

  async delete(id: number) {

    await this.repository.delete(id);

    return {
      success: true,
      message: "Incision deleted successfully"
    };
  }

  async search(
    doctorId: number,
    keyword: string
  ) {

    return {
      success: true,
      message: "Incision search completed",
      data: await this.repository.search(
        doctorId,
        keyword
      )
    };
  }
}