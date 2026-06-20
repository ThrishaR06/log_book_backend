import { PostOpOrdersRepository }
from "./postOpOrders.repository";

export class PostOpOrdersService {

  private repository =
    new PostOpOrdersRepository();

  async create(data: any) {

    const id =
      await this.repository.create(
        data
      );

    return {
      success: true,
      message:
      "Post-op orders saved successfully",
      data: { id }
    };
  }

  async getBySurgeryId(
    surgeryId: number
  ) {

    return {
      success: true,
      message:
      "Post-op orders fetched successfully",
      data:
      await this.repository.getBySurgeryId(
        surgeryId
      )
    };
  }
}