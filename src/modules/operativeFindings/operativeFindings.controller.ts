import { OperativeFindingsService } from "./operativeFindings.service";
import { ApiResponse } from "../../utils/apiResponse";

export class OperativeFindingsController {

  private service =
    new OperativeFindingsService();

  async create({ body, store }: any) {
    try {

        const result =
            await this.service.create({
                ...body,
                doctorId: store.user.id
            });

        return ApiResponse.success(
            result,
            "Operative findings master created successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to create operative findings master."
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
            "Operative findings masters fetched successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to fetch operative findings masters."
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
            "Operative findings master updated successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to update operative findings master."
        );

    }
}

 async delete(
  id: string,
  { store }: any
){
    try {

        const result =
    await this.service.delete(
      Number(id),
      store.user.id
    );

  return ApiResponse.success(
    result,
    "Operative findings master deleted successfully."
  );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to delete operative findings master."
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
            "Operative findings masters fetched successfully."
        );

    } catch (error: any) {

        return ApiResponse.error(
            error.message || "Failed to search operative findings masters."
        );

    }
}

}