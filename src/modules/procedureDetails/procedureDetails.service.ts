import { ProcedureDetailsRepository } from "./procedureDetails.repository";

export class ProcedureDetailsService {

  private repository =
    new ProcedureDetailsRepository();

  async create(body: any) {

  try {

    const isValid =
      await this.repository.validateDoctorCategory(
        body.doctorId,
        body.categoryId
      );

    if (!isValid) {
      return {
        success: false,
        message: "Category not found."
      };
    }

    const id =
      await this.repository.create(body);

    return await this.repository.findById(
    id,
    body.doctorId
);

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
      data: null
    };

  }

}

  async getAll(data: any) {

  try {

    const isValid =
      await this.repository.validateDoctorCategory(
        data.doctorId,
        data.categoryId
      );

    if (!isValid) {
      return {
        success: false,
        message: "Category not found."
      };
    }

    return await this.repository.findAll(
    data.doctorId,
    data.categoryId
);

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
      data: null
    };

  }

}

 async update(id: number, body: any) {

  try {

    const isValid =
      await this.repository.validateDoctorCategory(
        body.doctorId,
        body.categoryId
      );

    if (!isValid) {
      return {
        success: false,
        message: "Category not found."
      };
    }

    await this.repository.update(
    id,
    body.doctorId,
    body
);

    return await this.repository.findById(
    id,
    body.doctorId
);

  } catch (error: any) {

    return {
      success: false,
      message: error.message,
      data: null
    };

  }

}

 async delete(
    id: number,
    doctorId: number
) {

    try {

        const isValid =
            await this.repository
                .validateDoctorProcedureDetails(
                    id,
                    doctorId
                );

        if (!isValid) {

            return {
                success: false,
                message: "Procedure Details not found."
            };

        }

        await this.repository.delete(
    id,
    doctorId
);

        return {
            success: true,
            message: "Procedure Details deleted successfully"
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

    }

}

  async search(data: any) {

  try {

    const isValid =
      await this.repository.validateDoctorCategory(
        data.doctorId,
        data.categoryId
      );

    if (!isValid) {
      return {
        success: false,
        message: "Category not found."
      };
    }

    return await this.repository.search(
    data.keyword,
    data.doctorId,
    data.categoryId
);
  } catch (error: any) {

    return {
      success: false,
      message: error.message,
      data: null
    };

  }

}

}