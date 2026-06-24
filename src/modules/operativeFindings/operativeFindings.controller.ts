import { OperativeFindingsService } from "./operativeFindings.service";

export class OperativeFindingsController {

  private service =
    new OperativeFindingsService();

  create({ body, store }: any) {

    return this.service.create({
      ...body,
      doctorId: store.user.id
    });

  }

  getAll({ query, store }: any) {

    return this.service.getAll({
      doctorId: store.user.id,
      categoryId: Number(query.categoryId)
    });

  }

  update(
    id: string,
    { body, store }: any
  ) {

    return this.service.update(
      Number(id),
      {
        ...body,
        doctorId: store.user.id
      }
    );

  }

  delete(id: string) {

    return this.service.delete(
      Number(id)
    );

  }

  search({ query, store }: any) {

    return this.service.search({
      keyword: String(query.keyword || ""),
      doctorId: store.user.id,
      categoryId: Number(query.categoryId)
    });

  }

}