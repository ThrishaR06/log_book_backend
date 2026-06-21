import { ProcedureDetailsRepository } from "./procedureDetails.repository";

export class ProcedureDetailsService {

  private repository =
    new ProcedureDetailsRepository();

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
      message: "Procedure Details deleted successfully"
    };

  }

  async search(keyword: string) {

    return this.repository.search(keyword);

  }

}