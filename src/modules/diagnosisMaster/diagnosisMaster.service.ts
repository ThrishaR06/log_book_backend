import { DiagnosisMasterRepository }
from "./diagnosisMaster.repository";

export class DiagnosisMasterService {

  private repository =
    new DiagnosisMasterRepository();

  async create(body: any) {

    const id =
      await this.repository.create(body);

    return this.repository.findById(id);
  }

  async getAll() {
    return this.repository.findAll();
  }

  async update(id: number, body: any) {

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

  async search(keyword: string) {
    return this.repository.search(keyword);
  }
}