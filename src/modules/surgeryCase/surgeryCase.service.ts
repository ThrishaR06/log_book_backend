import { SurgeryCaseRepository }
from "./surgeryCase.repository";

export class SurgeryCaseService {

  private repository =
    new SurgeryCaseRepository();

 async create(data: any) {

  const id =
    await this.repository.create(data);

  const surgeryCase =
    await this.repository.findById(id);

  return {
    success: true,
    message: "Surgery case created successfully",
    data: surgeryCase
  };
}
async getDoctorId(surgeryId: number) {

    return await this.repository.getDoctorIdBySurgeryId(
        surgeryId
    );

}
}