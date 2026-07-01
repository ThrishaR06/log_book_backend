import { IncisionRepository } from "./incision.repository";

export class IncisionService {

  private repository =
    new IncisionRepository();

 async create(data: any) {
    try {

        const incision =
            await this.repository.create(data);

        return {
            success: true,
            message: "Incision created successfully",
            data: incision
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to create incision");
    }
}

  async getAll(doctorId: number) {
    try {

        return {
            success: true,
            message: "Incision fetched successfully",
            data: await this.repository.findAll(doctorId)
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch incisions");
    }
}
 async list(doctorId: number) {
    try {

        const data =
            await this.repository.list(doctorId);

        return {
            success: true,
            message: "Incisions fetched successfully",
            data
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch incisions");
    }
}

  async getById(
    id: number,
    doctorId: number
) {
    try {

        return {
            success: true,
            message: "Incision fetched successfully",
            data: await this.repository.findById(
                id,
                doctorId
            )
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch incision");
    }
}

  async update(id: number, data: any) {
    try {

        const updatedIncision =
    await this.repository.update(id, data);

if (!updatedIncision) {
    return {
        success: false,
        message: "Incision not found"
    };
}

return {
    success: true,
    message: "Incision updated successfully",
    data: updatedIncision
};

    } catch (error: any) {
        throw new Error(error.message || "Failed to update incision");
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
            message: "Incision deleted successfully"
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to delete incision"
        );

    }
}

 async search(
    doctorId: number,
    keyword: string
) {
    try {

        return {
            success: true,
            message: "Incision search completed",
            data: await this.repository.search(
                doctorId,
                keyword
            )
        };

    } catch (error: any) {
        throw new Error(error.message || "Failed to search incisions");
    }
}
}