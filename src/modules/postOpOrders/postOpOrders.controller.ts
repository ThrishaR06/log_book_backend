import { PostOpOrdersService }
from "./postOpOrders.service";

export class PostOpOrdersController {

  private service =
    new PostOpOrdersService();

  async create(body: any) {

    try {

      return await this.service.create(body);

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }

  }

  async getBySurgeryId(
    surgeryId: number,
    doctorId: number
  ) {

    try {

      return await this.service.getBySurgeryId(
        surgeryId,
        doctorId
      );

    } catch (error: any) {

      return {
        success: false,
        message: error.message
      };

    }

  }

}