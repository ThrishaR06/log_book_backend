import { SurgeryStaffRepository } from "./surgeryStaff.repository";

export class SurgeryStaffService {

  private repository =
    new SurgeryStaffRepository();

 async create(data: any) {
  try {

    const id = await this.repository.create(data);

    return {
      success: true,
      message: "Staff created successfully",
      data: {
        id
      }
    };

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
      data: null
    };
  }
}

async search(doctorId: number, keyword: string) {

  const staffs = await this.repository.search(
    doctorId,
    keyword
  );

  return {
    success: true,
    message: "Staff search completed",
    data: staffs
  };
}

async list(
  doctorId: number,
  categoryId: number
) {

  const data =
    await this.repository.list(
      doctorId,
      categoryId
    );

  return {
    success: true,
    message: "Staff fetched successfully",
    data
  };
}


  async getAll(doctorId: number) {

    return this.repository.findAll(
      doctorId
    );
  }

  async getById(id: number) {

    return this.repository.findById(id);
  }

  async update(id: number, data: any) {

    await this.repository.update(id, data);

    return {
      message:
        "Staff updated successfully"
    };
  }

  async delete(id: number) {

    await this.repository.delete(id);

    return {
      message:
        "Staff deleted successfully"
    };
  }
}