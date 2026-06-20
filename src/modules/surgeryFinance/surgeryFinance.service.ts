import { SurgeryFinanceRepository }
from "./surgeryFinance.repository";

export class SurgeryFinanceService {

  private repository =
    new SurgeryFinanceRepository();

  async create(data: any) {

    const id =
      await this.repository.create(
        data
      );

    return {
      success: true,
      message:
        "Finance details saved successfully",
      data: { id }
    };
  }

  async getBySurgeryId(
    surgeryId: number
  ) {

    return {
      success: true,
      message:
        "Finance details fetched successfully",
      data:
        await this.repository.findBySurgeryId(
          surgeryId
        )
    };
  }

  async update(
    surgeryId: number,
    data: any
  ) {

    await this.repository.update(
      surgeryId,
      data
    );

    return {
      success: true,
      message:
        "Finance details updated successfully"
    };
  }

  async delete(
    surgeryId: number
  ) {

    await this.repository.delete(
      surgeryId
    );

    return {
      success: true,
      message:
        "Finance details deleted successfully"
    };
  }
}