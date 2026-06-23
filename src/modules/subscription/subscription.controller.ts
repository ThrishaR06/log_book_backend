import { SubscriptionService } from "./subscription.service";

export class SubscriptionController {

    private service = new SubscriptionService();

    // ==========================
    // GET ALL SUBSCRIPTION PLANS
    // ==========================
    getPlans() {
        return this.service.getPlans();
    }

    // ==========================
    // CREATE ORDER
    // ==========================
    createOrder(body: any) {
    return this.service.createOrder(body);
}




    // ==========================
    // VERIFY PAYMENT
    // ==========================
    verifyPayment(body: any) {
        return this.service.verifyPayment(body);
    }

    // ==========================
    // CASHFREE WEBHOOK
    // ==========================
    webhook(body: any) {
    return this.service.webhook(body);
}

    // ==========================
    // MY SUBSCRIPTION
    // ==========================
    mySubscription(doctorId: number) {
        return this.service.mySubscription(doctorId);
    }

    // ==========================
    // SUBSCRIPTION HISTORY
    // ==========================
    subscriptionHistory(doctorId: number) {
        return this.service.subscriptionHistory(doctorId);
    }

}