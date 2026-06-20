import { IncisionService } from "./incision.service";

export class IncisionController {

  private service =
    new IncisionService();

  create(body: any) {
    return this.service.create(body);
  }

  getAll(doctorId: number) {
    return this.service.getAll(doctorId);
  }

  getById(id: number) {
    return this.service.getById(id);
  }

  update(id: number, body: any) {
    return this.service.update(id, body);
  }

  delete(id: number) {
    return this.service.delete(id);
  }

  search(
    doctorId: number,
    keyword: string
  ) {
    return this.service.search(
      doctorId,
      keyword
    );
  }

  list(
  doctorId: number,
  categoryId: number
) {
  return this.service.list(
    doctorId,
    categoryId
  );
}
}