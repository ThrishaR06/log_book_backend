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

  async search(doctorId: number, keyword: string) {

  const staffs = await this.repository.search(
    doctorId,
    keyword
  );

  return ApiResponse.success(
    staffs,
    "Staff search completed"
  );
}

  async list(doctorId: number) {

  const data =
    await this.repository.list(doctorId);

  return ApiResponse.success(
    data,
    "Staff fetched successfully"
  );

}

  async getAll(doctorId: number) {

  const data =
    await this.repository.findAll(doctorId);

  return ApiResponse.success(
    data,
    "Staff fetched successfully"
  );

}

async getById(id: number) {

  const data =
    await this.repository.findById(id);

  return ApiResponse.success(
    data,
    "Staff fetched successfully"
  );

}

async update(id: number, data: any) {

  await this.repository.update(id, data);

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

}

  async delete(id: number) {

  await this.repository.delete(id);

  return ApiResponse.success(
    null,
    "Staff deleted successfully"
  );

}

async listByStaffType(
  doctorId: number,
  staffType: number
) {

  const data =
    await this.repository.listByStaffType(
      doctorId,
      staffType
    );

  return ApiResponse.success(
    data,
    "Staff fetched successfully"
  );

}
}