import { SurgeryStaffRepository } from "./surgeryStaff.repository";
import { ApiResponse } from "../../utils/apiResponse";

export class SurgeryStaffService {

  private repository =
    new SurgeryStaffRepository();

  async create(data: any) {
    try {

      const id = await this.repository.create(data);

      return ApiResponse.success(
        {
          id,
          doctorId: data.doctorId,
          staffType: data.staffType,
          name: data.name,
          qualification: data.qualification,
          mobile: data.mobile
        },
        "Staff created successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }
  }

  async search(
    doctorId: number,
    keyword: string
  ) {

    try {

      const staffs =
        await this.repository.search(
          doctorId,
          keyword
        );

      return ApiResponse.success(
        staffs,
        "Staff search completed"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

  async list(
    doctorId: number
  ) {

    try {

      const data =
        await this.repository.list(
          doctorId
        );

      return ApiResponse.success(
        data,
        "Staff fetched successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

  async getAll(
    doctorId: number
  ) {

    try {

      const data =
        await this.repository.findAll(
          doctorId
        );

      return ApiResponse.success(
        data,
        "Staff fetched successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

  async getById(
    id: number,
    doctorId: number
  ) {

    try {

      const data =
        await this.repository.findById(
          id,
          doctorId
        );

      return ApiResponse.success(
        data,
        "Staff fetched successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

  async update(
    id: number,
    data: any
  ) {

    try {

      await this.repository.update(
        id,
        data
      );

      return ApiResponse.success(
        {
          id,
          doctorId: data.doctorId,
          staffType: data.staffType,
          name: data.name,
          qualification: data.qualification,
          mobile: data.mobile
        },
        "Staff updated successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

  async delete(
    id: number,
    doctorId: number
  ) {

    try {

      await this.repository.delete(
        id,
        doctorId
      );

      return ApiResponse.success(
        null,
        "Staff deleted successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

  async listByStaffType(
    doctorId: number,
    staffType: number
  ) {

    try {

      const data =
        await this.repository.listByStaffType(
          doctorId,
          staffType
        );

      return ApiResponse.success(
        data,
        "Staff fetched successfully"
      );

    } catch (error: any) {

      return ApiResponse.error(
        error.message
      );

    }

  }

}