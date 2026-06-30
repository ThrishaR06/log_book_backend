import { PostOpOrdersRepository }
from "./postOpOrders.repository";

export class PostOpOrdersService {

  private repository =
    new PostOpOrdersRepository();

  async create(data: any) {

    try {

        const isValid =
            await this.repository
                .validateDoctorSurgery(
                    data.doctorId,
                    data.surgeryId
                );

        if (!isValid) {

            return {
                success: false,
                message: "Surgery not found."
            };

        }

        const id =
            await this.repository.create(
                data
            );

        return {
            success: true,
            message:
                "Post-op orders saved successfully",
            data: { id }
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }

}

  async getBySurgeryId(
    surgeryId: number,
    doctorId: number
) {

    try {

        const isValid =
            await this.repository
                .validateDoctorSurgery(
                    doctorId,
                    surgeryId
                );

        if (!isValid) {

            return {
                success: false,
                message: "Surgery not found."
            };

        }

        return {
            success: true,
            message:
                "Post-op orders fetched successfully",
            data:
                await this.repository
                    .getBySurgeryId(
                        surgeryId
                    )
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message
        };

    }

}
}