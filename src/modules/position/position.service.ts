import { PositionRepository } from "./position.repository";

export class PositionService {

  private repository =
    new PositionRepository();

  async create(data: any) {
    try {

        const position =
            await this.repository.create(data);

        return {
            success: true,
            message: "Position created successfully",
            data: position
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to create position"
        );

    }
}

  async getAll(doctorId: number) {
    try {

        return {
            success: true,
            message: "Position fetched successfully",
            data: await this.repository.findAll(
                doctorId
            )
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to fetch positions"
        );

    }
}

 async getById(
    id: number,
    doctorId: number
) {
    try {

        return {
            success: true,
            message: "Position fetched successfully",
            data: await this.repository.findById(
                id,
                doctorId
            )
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to fetch position"
        );

    }
}
 async update(
    id: number,
    data: any
) {
    try {

        await this.repository.update(
            id,
            data
        );

        return {
            success: true,
            message: "Position updated successfully"
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to update position"
        );

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
            message: "Position deleted successfully"
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to delete position"
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
            message: "Position search completed",
            data: await this.repository.search(
                doctorId,
                keyword
            )
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to search positions"
        );

    }
}

async list(
    doctorId: number,
    categoryId: number
) {
    try {

        const data =
            await this.repository.list(
                doctorId,
                categoryId
            );

        return {
            success: true,
            message: "Positions fetched successfully",
            data
        };

    } catch (error: any) {

        throw new Error(
            error.message || "Failed to fetch positions"
        );

    }
}
}