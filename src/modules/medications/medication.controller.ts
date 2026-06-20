import { MedicationService } from "./medication.service";

export class MedicationController {

    // =========================
    // CREATE
    // =========================
    static async create({ body, store }: any) {

        return await MedicationService.create({
    medicationName: body.medicationName,
    route: body.route,
    frequency: body.frequency,
    doctorId: store.user.id,
    categoryId: body.categoryId,
});

    }

    // =========================
    // GET ALL (doctor + category)
    // =========================
    static async getAll({ store, query }: any) {

        return await MedicationService.getAll(
            store.user.id,
            Number(query.categoryId)
        );

    }

    // =========================
    // SEARCH
    // =========================
    static async search({ query }: any) {

    return await MedicationService.search(
        Number(query.categoryId),
        query.keyword
    );
}
    // =========================
    // UPDATE
    // =========================
    static async update({ params, body }: any) {

        return await MedicationService.update(
            Number(params.id),
            body
        );

    }

    // =========================
    // DELETE
    // =========================
    static async delete({ params }: any) {

        return await MedicationService.delete(
            Number(params.id)
        );

    }

}