import { SubscriptionRepository } from "./subscription.repository";

export class SubscriptionLimitService {

    private static repository = new SubscriptionRepository();

    // ==========================
    // GET DOCTOR ACTIVE SUBSCRIPTION
    // ==========================
    static async getDoctorSubscription(doctorId: number) {

        const subscription =
            await this.repository.getActiveSubscription(doctorId);

        if (!subscription) {
            throw new Error(
                "No active subscription found. Please purchase a subscription."
            );
        }

        return subscription;
    }

    // ==========================
    // VALIDATE OPERATIONAL RECORD LIMIT
    // ==========================
    static async validateOperationalLimit(
        doctorId: number,
        usedRecords: number
    ) {

        const subscription =
            await this.getDoctorSubscription(doctorId);

        if (
            subscription.operational_record_limit !== -1 &&
            usedRecords >= subscription.operational_record_limit
        ) {
            throw new Error(
                "Operational record limit exceeded. Please upgrade your subscription."
            );
        }

        return true;
    }

    // ==========================
    // VALIDATE TEMPLATE LIMIT
    // ==========================
    static async validateTemplateLimit(
        doctorId: number,
        templateCount: number
    ) {

        const subscription =
            await this.getDoctorSubscription(doctorId);

        if (
            subscription.template_limit !== -1 &&
            templateCount >= subscription.template_limit
        ) {
            throw new Error(
                "Template limit exceeded. Please upgrade your subscription."
            );
        }

        return true;
    }

    // ==========================
    // VALIDATE STORAGE LIMIT
    // ==========================
    static async validateStorageLimit(
        doctorId: number,
        newFileSize: number
    ) {

        const subscription =
            await this.getDoctorSubscription(doctorId);

        // Unlimited storage
        if (subscription.storage_limit === "Unlimited") {
            return true;
        }

        // Get already used storage
        const usedStorage =
            await this.repository.getUsedStorage(doctorId);

        // Convert storage limit to bytes
        // ==========================

        const match = subscription.storage_limit
            .trim()
            .match(/^(\d+)\s*(KB|MB|GB)$/i);

        if (!match) {
            throw new Error("Invalid storage limit.");
        }

        const limit = Number(match[1]);
        const unit = match[2].toUpperCase();

        let limitInBytes = limit;

        switch (unit) {

            case "KB":
                limitInBytes *= 1024;
                break;

            case "MB":
                limitInBytes *= 1024 * 1024;
                break;

            case "GB":
                limitInBytes *= 1024 * 1024 * 1024;
                break;
        }

        if (Number(usedStorage) + newFileSize > limitInBytes) {
            throw new Error(
                "Storage limit exceeded. Please upgrade your subscription."
            );
        }

        return true;
    }
}