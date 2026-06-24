import { AnaesthesiaRepository } from "./anaesthesia.repository";

export class AnaesthesiaService {
  private repository = new AnaesthesiaRepository();

  async create(data: any) {
    try {
      const payload = {
        doctorId: data.doctorId,
        anaesthesiaName: data.anaesthesiaName,
      };

      const anaesthesia = await this.repository.create(payload);

      return {
        success: true,
        message: "Anaesthesia created successfully",
        data: anaesthesia
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async list(doctorId: number) {
    const data = await this.repository.list(doctorId);

    return {
      success: true,
      message: "Anaesthesia fetched successfully",
      data
    };
  }

  async getAll(doctorId: number) {
    const data = await this.repository.findAll(doctorId);

    return {
      success: true,
      message: "Anaesthesia fetched successfully",
      data
    };
  }

  async getById(id: number) {
    const data = await this.repository.findById(id);

    return {
      success: true,
      message: "Anaesthesia fetched successfully",
      data
    };
  }

  async update(id: number, data: any) {
  await this.repository.update(id, data);

  const updatedData =
    await this.repository.findById(id);

  return {
    success: true,
    message: "Anaesthesia updated successfully",
    data: updatedData
  };
}

  async delete(id: number) {
    await this.repository.delete(id);

    return {
      success: true,
      message: "Anaesthesia deleted successfully"
    };
  }

  async search(doctorId: number, keyword: string) {
    const data = await this.repository.search(doctorId, keyword);

    return {
      success: true,
      message: "Anaesthesia search completed",
      data
    };
  }
}