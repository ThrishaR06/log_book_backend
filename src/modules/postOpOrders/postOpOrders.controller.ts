import { PostOpOrdersService }
from "./postOpOrders.service";

export class PostOpOrdersController {

  private service =
    new PostOpOrdersService();

  create(body: any) {
    return this.service.create(body);
  }

  getBySurgeryId(
    surgeryId: number
  ) {
    return this.service.getBySurgeryId(
      surgeryId
    );
  }
}