import { OperativeFindingsService } from "./operativeFindings.service";
import { ApiResponse } from "../../utils/apiResponse";

export class OperativeFindingsController {

  private service =
    new OperativeFindingsService();

  async create({ body, store }: any) {

    const result =
      await this.service.create({
        ...body,
        doctorId: store.user.id
      });

    return ApiResponse.success(
      result,
      "Operative findings master created successfully."
    );

  }

  async getAll({ query, store }: any) {

    const result =
      await this.service.getAll({
        doctorId: store.user.id,
        categoryId: Number(query.categoryId)
      });

    return ApiResponse.success(
      result,
      "Operative findings masters fetched successfully."
    );

  }

  async update(
    id: string,
    { body, store }: any
  ) {

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

  }

  async delete(id: string) {

    const result =
      await this.service.delete(
        Number(id)
      );

    return ApiResponse.success(
      result,
      "Operative findings master deleted successfully."
    );

  }

  async search({ query, store }: any) {

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

  }

}