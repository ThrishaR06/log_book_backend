import { ProcedureDetailsService } from "./procedureDetails.service";
import { ApiResponse } from "../../utils/apiResponse";

export class ProcedureDetailsController {

  private service =
    new ProcedureDetailsService();

  async create({ body, store }: any) {

  try {

    const result =
      await this.service.create({
        ...body,
        doctorId: store.user.id
      });

    return ApiResponse.success(
      result,
      "Procedure details master created successfully."
    );

  } catch (error: any) {

    return ApiResponse.error(
      error.message || "Failed to create procedure details."
    );

  }

}

  async getAll({ query, store }: any) {

  try {

    const result =
      await this.service.getAll({
        doctorId: store.user.id,
        categoryId: Number(query.categoryId)
      });

    return ApiResponse.success(
      result,
      "Procedure details masters fetched successfully."
    );

  } catch (error: any) {

    return ApiResponse.error(
      error.message || "Failed to fetch procedure details."
    );

  }

}

 async update(
  id: string,
  { body, store }: any
) {

  try {

    const result =
      await this.service.update(
        Number(id),
        {
          ...body,
          doctorId: store.user.id
        }
      );

    return ApiResponse.success(
      result,
      "Procedure details master updated successfully."
    );

  } catch (error: any) {

    return ApiResponse.error(
      error.message || "Failed to update procedure details."
    );

  }

}

 async delete(
    id: string,
    { store }: any
) {

    try {

        const result =
            await this.service.delete(
                Number(id),
                store.user.id
            );

        return ApiResponse.success(
            result,
            "Procedure details master deleted successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message ||
            "Failed to delete procedure details."
        );

    }

}

  async search({ query, store }: any) {

  try {

    const result =
      await this.service.search({
        keyword: String(query.keyword || ""),
        doctorId: store.user.id,
        categoryId: Number(query.categoryId)
      });

    return ApiResponse.success(
      result,
      "Procedure details masters fetched successfully."
    );

  } catch (error: any) {

    return ApiResponse.error(
      error.message || "Failed to search procedure details."
    );

  }

}

}