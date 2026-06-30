import { AdditionalNotesMasterService } from "./additionalNotesMaster.service";

export class AdditionalNotesMasterController {

    // ==========================
    // CREATE
    // ==========================
    static async create({ body, store }: any) {

        try {

        return await AdditionalNotesMasterService.create({
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });

    }catch (error) {
        console.error("Additional Notes Create Error:", error);

        return {
            success: false,
            message: "Something went wrong while creating additional notes master.",
        };

    }

}

    // ==========================
    // GET ALL
    // ==========================
    static async getAll({ query, store }: any) {

        try {

        return await AdditionalNotesMasterService.getAll({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
        });

    } catch (error) {

        console.error("Additional Notes Get All Error:", error);

        return {
            success: false,
            message: "Something went wrong while fetching additional notes masters.",
        };

    }

}

    // ==========================
    // GET BY ID
    // ==========================
    static async getById({ params, store }: any) {
         try {

        return await AdditionalNotesMasterService.getById({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    }catch (error) {

        console.error("Additional Notes Get By Id Error:", error);

        return {
            success: false,
            message: "Something went wrong while fetching additional notes master.",
        };

    }

}

    // ==========================
    // UPDATE
    // ==========================
    static async update({ params, body, store }: any) {

         try {

        return await AdditionalNotesMasterService.update({
            id: Number(params.id),
            doctorId: store.user.id,
            categoryId: Number(body.categoryId),
            instruction: body.instruction,
        });

    }catch (error) {

        console.error("Additional Notes Update Error:", error);

        return {
            success: false,
            message: "Something went wrong while updating additional notes master.",
        };

    }

}

    // ==========================
    // DELETE
    // ==========================
    static async delete({ params, store }: any) {

        try {

        return await AdditionalNotesMasterService.delete({
            id: Number(params.id),
            doctorId: store.user.id,
        });

    } catch (error) {

        console.error("Additional Notes Delete Error:", error);

        return {
            success: false,
            message: "Something went wrong while deleting additional notes master.",
        };

    }

}

    // ==========================
    // SEARCH
    // ==========================
    static async search({ query, store }: any) {

        try {

        return await AdditionalNotesMasterService.search({
            doctorId: store.user.id,
            categoryId: Number(query.categoryId),
            search: query.search,
        });

    }
    catch (error) {

        console.error("Additional Notes Search Error:", error);

        return {
            success: false,
            message: "Something went wrong while searching additional notes master.",
        };

    }

}

}