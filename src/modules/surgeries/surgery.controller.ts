import { SurgeryService } from "./surgery.service";

export class SurgeryController {

    static async create({ body, store }: any) {

        const data = await SurgeryService.createSurgery({
            doctorId: store.user.id,
            hospitalId: body.hospitalId,
            templateId: body.templateId,
            surgeryDate: body.surgeryDate,
            earnings: body.earnings,
            notes: body.notes,
        });

        return {
            success: true,
            message: "Surgery created successfully",
            data,
        };
    }

    static async getAll({ store }: any) {

        const data = await SurgeryService.getSurgeries(
            store.user.id
        );

        return {
            success: true,
            data,
        };
    }

    static async getOne({ params, store }: any) {

        const data = await SurgeryService.getSurgeryById(
            Number(params.id),
            store.user.id
        );

        if (!data) {
            return {
                success: false,
                message: "Surgery not found",
            };
        }

        return {
            success: true,
            data,
        };
    }

    static async update({ params, body, store }: any) {

        const data = await SurgeryService.updateSurgery(
            Number(params.id),
            store.user.id,
            {
                hospitalId: body.hospitalId,
                templateId: body.templateId,
                surgeryDate: body.surgeryDate,
                earnings: body.earnings,
                notes: body.notes,
            }
        );

        return {
            success: true,
            message: "Surgery updated successfully",
            data,
        };
    }

    static async delete({ params, store }: any) {

        const data = await SurgeryService.deleteSurgery(
            Number(params.id),
            store.user.id
        );

        return {
            success: true,
            ...data,
        };
    }
}