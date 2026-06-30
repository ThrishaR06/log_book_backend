import { ClinicalDetailsRepository }
from "./clinicalDetails.repository";

export class ClinicalDetailsService {

  private repository =
    new ClinicalDetailsRepository();

  async create(data: any) {

    const id =
      await this.repository.create(data);

    return {
      success: true,
      message: "Clinical details saved successfully",
      data: {
        id
      }
    };
  }

  async getBySurgeryId(
    surgeryId: number,
    doctorId: number
) {

    const data =
      await this.repository.findBySurgeryId(
        surgeryId
      );

    return {
      success: true,
      message: "Clinical details fetched successfully",
      data
    };
  }

  async update(
    surgeryId: number,
    doctorId: number,
    data: any
) {

    await this.repository.update(
      surgeryId,
      data
    );

    return {
      success: true,
      message: "Clinical details updated successfully"
    };
  }
}