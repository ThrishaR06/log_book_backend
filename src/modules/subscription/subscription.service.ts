import { SubscriptionRepository } from "./subscription.repository";
import Cashfree from "../../config/cashfree.config";

export class SubscriptionService {
   private calculateExpiryDate(
    startDate: Date,
    frequency: string
) {
    const expiryDate = new Date(startDate);

    switch (frequency) {
        case "monthly":
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            break;

        case "quarterly":
            expiryDate.setMonth(expiryDate.getMonth() + 3);
            break;

        case "half_yearly":
            expiryDate.setMonth(expiryDate.getMonth() + 6);
            break;

        case "yearly":
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            break;
    }

    return expiryDate;
}

private repository = new SubscriptionRepository();

   // ==========================
// GET ALL SUBSCRIPTION PLANS
// ==========================
async getPlans() {

    try {

        const data = await this.repository.getPlans();

        return {
            success: true,
            message: "Subscription plans fetched successfully",
            data
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

    }

}

    // ==========================
    // CREATE ORDER
    // ==========================
    async createOrder(data: any) {
    try {

        // Find selected plan
        const [plan, doctor] = await Promise.all([

    this.repository.findPlan(data.planId),

    this.repository.findDoctor(data.doctorId)

]);

if (!doctor) {
    return {
        success: false,
        message: "Doctor not found",
        data: null
    };
}


// Validate doctor details
if (!doctor.phone) {
    return {
        success: false,
        message: "Doctor phone number is missing",
        data: null
    };
}

if (!doctor.email_address) {
    return {
        success: false,
        message: "Doctor email is missing",
        data: null
    };
}

        if (!plan) {
            return {
                success: false,
                message: "Subscription plan not found",
                data: null
            };
        }

        // Generate unique order id
        const orderId =
            "ORD-" +
            Date.now() +
            "-" +
            Math.floor(Math.random() * 1000);

        // Cashfree Order Request
        const request = {

    order_id: orderId,

    order_amount: Number(plan.amount),

    order_currency: "INR",

    customer_details: {

        customer_id: String(doctor.id),

        customer_name: doctor.full_name,

        customer_email: doctor.email_address,

        customer_phone: doctor.phone

    },

    order_meta: {

        return_url:
            "http://localhost:3000/payment-success?order_id={order_id}"

    }

};

        // Create order in Cashfree
        const response = await Cashfree.PGCreateOrder(
            "2022-09-01",
            request
        );

        // Save pending subscription
        await this.repository.createSubscription({

            doctorId: data.doctorId,

            planId: data.planId,

            orderId,

            paymentStatus: "PENDING",

            amount: plan.amount

        });

        return {

            success: true,

            message: "Order created successfully",

            data: {

                orderId,

                paymentSessionId:
                    response.data.payment_session_id,

                orderToken:
                    response.data.cf_order_id,

                amount: plan.amount

            }

        };

    } catch (error: any) {

        return {

            success: false,

            message:
                error?.response?.data?.message ||
                error.message,

            data: null

        };

    }
}

    // ==========================
    // VERIFY PAYMENT
    // ==========================
    async verifyPayment(data: any) {

    try {

        const subscription =
            await this.repository.findPlanBySubscription(
                data.orderId
            );

        if (!subscription) {
            return {
                success: false,
                message: "Subscription not found",
                data: null
            };
        }

        // Fetch order from Cashfree
        const response = await Cashfree.PGFetchOrder(
            "2022-09-01",
            data.orderId
        );

        const order = response.data;

        // Payment not completed
        if (order.order_status !== "PAID") {

            await this.repository.updatePaymentFailed(
    data.orderId,
    order.order_status ?? "FAILED"
);

            return {
                success: false,
                message: "Payment not completed",
                data: order
            };
        }

        // Calculate dates
       const startDate = new Date();

const expiryDate = this.calculateExpiryDate(
    startDate,
    subscription.frequency
);

        // Update subscription
        await this.repository.updatePaymentSuccess({

            orderId: data.orderId,

            paymentStatus: "SUCCESS",

            transactionId: order.cf_order_id,

            paymentMethod: "ONLINE",

            startDate,

            expiryDate

        });

        return {

            success: true,

            message: "Payment verified successfully",

            data: {

                orderId: data.orderId,

                paymentStatus: "SUCCESS",

                startDate,

                expiryDate

            }

        };

    } catch (error: any) {

        return {

            success: false,

            message:
                error?.response?.data?.message ||
                error.message,

            data: null

        };

    }

}




    // ==========================
    // CASHFREE WEBHOOK
    // ==========================
    async webhook(data: any) {

    try {

        const orderId = data.data.order.order_id;

        const paymentStatus = data.data.payment.payment_status;

        if (paymentStatus !== "SUCCESS") {

            await this.repository.updatePaymentFailed(
                orderId,
                paymentStatus
            );

            return {
                success: true,
                message: "Webhook received"
            };
        }

        const subscription =
            await this.repository.findPlanBySubscription(
                orderId
            );

        if (!subscription) {

            return {
                success: false,
                message: "Subscription not found"
            };

        }

        const startDate = new Date();

const expiryDate = this.calculateExpiryDate(
    startDate,
    subscription.frequency
);

        await this.repository.updatePaymentSuccess({

            orderId,

            paymentStatus: "SUCCESS",

            transactionId: data.data.payment.cf_payment_id,

            paymentMethod: data.data.payment.payment_group,

            startDate,

            expiryDate

        });

        return {

            success: true,

            message: "Webhook processed"

        };

    } catch (error: any) {

        return {

            success: false,

            message: error.message

        };

    }

}

   // ==========================
// MY SUBSCRIPTION
// ==========================
async mySubscription(
    doctorId: number
) {

    try {

        const data =
            await this.repository.getCurrentSubscription(
                doctorId
            );

        return {
            success: true,
            message: "Subscription fetched successfully",
            data
        };

    } catch (error: any) {

        return {
            success: false,
            message: error.message,
            data: null
        };

    }

}
   // ==========================
// SUBSCRIPTION HISTORY
// ==========================
async subscriptionHistory(
    doctorId: number
) {

    try {

        const data =
    await this.repository.getHistory(
        doctorId
    );

        return {

            success: true,

            message: "Subscription history fetched successfully",

            data

        };

    } catch (error: any) {

        return {

            success: false,

            message: error.message,

            data: null

        };

    }

}
}