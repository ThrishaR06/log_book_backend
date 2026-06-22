import { DiagnosisMasterService }
from "./diagnosisMaster.service";

export class DiagnosisMasterController {

  private service =
    new DiagnosisMasterService();

  create(body: any) {
    return this.service.create(body);
  }

  getAll() {
    return this.service.getAll();
  }

  update(id: string, body: any) {
    return this.service.update(
      Number(id),
      body
    );
  }

  delete(id: string) {
    return this.service.delete(
      Number(id)
    );
  }

  search(keyword: string) {
    return this.service.search(keyword);
  }
}