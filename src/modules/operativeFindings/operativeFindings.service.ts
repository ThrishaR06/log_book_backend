import { OperativeFindingsRepository } from "./operativeFindings.repository";

export class OperativeFindingsService {

  private repository =
    new OperativeFindingsRepository();

  async create(body: any) {
    try {
      const id = await this.repository.create(body);

      return this.repository.findById(id);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async getAll() {
    try {
      return await this.repository.findAll();
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
      await this.repository.update(id, body);

      return this.repository.findById(id);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async delete(id: number) {
    try {
      await this.repository.delete(id);

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

  async search(keyword: string) {
    try {
      return await this.repository.search(keyword);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

}