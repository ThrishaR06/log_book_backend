import { IncisionService } from "./incision.service";

export class IncisionController {

  private service =
    new IncisionService();

  async create(body: any) {
    try {
        return await this.service.create(body);
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to create incision"
        };
    }
}

  async getAll(doctorId: number) {
    try {
        return await this.service.getAll(doctorId);
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch incisions"
        };
    }
}
 async getById(
    id: number,
    doctorId: number
) {
    try {

        return await this.service.getById(
            id,
            doctorId
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message || "Failed to fetch incision"
        };

    }
}

  async update(id: number, body: any) {
    try {
        return await this.service.update(id, body);
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update incision"
        };
    }
}

 async delete(
    id: number,
    doctorId: number
) {
    try {

        return await this.service.delete(
            id,
            doctorId
        );

    } catch (error: any) {

        return {
            success: false,
            message: error.message || "Failed to delete incision"
        };

    }
}

  async search(
    doctorId: number,
    keyword: string
) {
    try {
        return await this.service.search(
            doctorId,
            keyword
        );
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to search incisions"
        };
    }
}
  async list(doctorId: number) {
    try {
        return await this.service.list(doctorId);
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch incisions"
        };
    }
}
}