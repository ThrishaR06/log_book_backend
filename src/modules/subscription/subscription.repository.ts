import { pool } from "../../db";

export class SubscriptionRepository {

    // ==========================
    // GET ALL ACTIVE PLANS
    // ==========================
    async getPlans() {

    const [rows]: any = await pool.query(
        `
        SELECT

            sp.id,
            s.id AS subscriptionId,
            s.plan_name,
            s.operational_record_limit,
            s.template_limit,
            s.storage_limit,

            sp.amount,
            sp.frequency,

            sp.is_active,
            sp.created_at,
            sp.updated_at

        FROM subscription_plans sp

        INNER JOIN subscriptions s
            ON s.id = sp.subscription_id

        WHERE sp.is_active = 1

        ORDER BY sp.amount ASC
        `
    );

    return rows;
}

    // ==========================
    // GET PLAN BY ID
    // ==========================
    async findPlan(planId: number) {

    const [rows]: any = await pool.query(
        `
        SELECT

            sp.*,

            s.plan_name,
            s.operational_record_limit,
            s.template_limit,
            s.storage_limit

        FROM subscription_plans sp

        INNER JOIN subscriptions s
            ON s.id = sp.subscription_id

        WHERE sp.id = ?

        LIMIT 1
        `,
        [planId]
    );

    return rows[0] || null;
}

    async findDoctor(doctorId: number) {

    const [rows]: any = await pool.query(
        `
        SELECT
            id,
            full_name,
            email_address,
            phone
        FROM doctors
        WHERE id = ?
        LIMIT 1
        `,
        [doctorId]
    );

    return rows[0] || null;
}

    // ==========================
    // CREATE SUBSCRIPTION
    // ==========================
    async createSubscription(data: any) {

        const [result]: any = await pool.query(
            `
            INSERT INTO doctor_subscriptions
            (
                doctor_id,
                plan_id,
                order_id,
                payment_status,
                amount
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [
                data.doctorId,
                data.planId,
                data.orderId,
                data.paymentStatus,
                data.amount
            ]
        );

        const [rows]: any = await pool.query(
            `
            SELECT *
            FROM doctor_subscriptions
            WHERE id = ?
            `,
            [result.insertId]
        );

        return rows[0];
    }

    // ==========================
    // FIND SUBSCRIPTION BY ORDER ID
    // ==========================
    async findSubscription(orderId: string) {

        const [rows]: any = await pool.query(
            `
            SELECT *
            FROM doctor_subscriptions
            WHERE order_id = ?
            LIMIT 1
            `,
            [orderId]
        );

        return rows[0] || null;
    }

    async updatePaymentSuccess(data: any) {

    await pool.query(
        `
        UPDATE doctor_subscriptions
        SET
            payment_status = ?,
            transaction_id = ?,
            payment_method = ?,
            start_date = ?,
            expiry_date = ?,
            updated_at = NOW()
        WHERE order_id = ?
        `,
        [
            data.paymentStatus,
            data.transactionId,
            data.paymentMethod,
            data.startDate,
            data.expiryDate,
            data.orderId
        ]
    );

}

async updatePaymentFailed(
    orderId: string,
    status: string
) {

    await pool.query(
        `
        UPDATE doctor_subscriptions
        SET
            payment_status = ?,
            updated_at = NOW()
        WHERE order_id = ?
        `,
        [
            status,
            orderId
        ]
    );

}

async findPlanBySubscription(orderId: string) {

    const [rows]: any = await pool.query(
        `
        SELECT

            ds.*,

            sp.frequency,

            s.plan_name

        FROM doctor_subscriptions ds

        INNER JOIN subscription_plans sp
            ON sp.id = ds.plan_id

        INNER JOIN subscriptions s
            ON s.id = sp.subscription_id

        WHERE ds.order_id = ?

        LIMIT 1
        `,
        [orderId]
    );

    return rows[0] || null;
}

    // ==========================
    // UPDATE PAYMENT SUCCESS
    // ==========================
    /* async updatePayment(data: any) {

        await pool.query(
            `
            UPDATE doctor_subscriptions
            SET
                payment_status = ?,
                transaction_id = ?,
                payment_method = ?,
                start_date = ?,
                expiry_date = ?
            WHERE order_id = ?
            `,
            [
                data.paymentStatus,
                data.transactionId,
                data.paymentMethod,
                data.startDate,
                data.expiryDate,
                data.orderId
            ]
        );
    } */

    // ==========================
    // UPDATE PAYMENT FAILED
    // ==========================
    async updatePaymentStatus(
        orderId: string,
        status: string
    ) {

        await pool.query(
            `
            UPDATE doctor_subscriptions
            SET payment_status = ?
            WHERE order_id = ?
            `,
            [
                status,
                orderId
            ]
        );
    }

    // ==========================
    // SAVE WEBHOOK LOG
    // ==========================
    async saveWebhook(data: any) {

        await pool.query(
            `
            INSERT INTO payment_logs
            (
                order_id,
                payment_status,
                request_data,
                response_data
            )
            VALUES
            (?, ?, ?, ?)
            `,
            [
                data.orderId,
                data.transactionId,
                data.paymentStatus,
                JSON.stringify(data.requestData),
                JSON.stringify(data.responseData)
            ]
        );
    }

  async mySubscription(doctorId: number) {

    const [rows]: any = await pool.query(
        `
        SELECT

            ds.*,

            s.plan_name,

            s.operational_record_limit,

            s.template_limit,

            s.storage_limit,

            sp.amount,

            sp.frequency

        FROM doctor_subscriptions ds

        INNER JOIN subscription_plans sp
            ON sp.id = ds.plan_id

        INNER JOIN subscriptions s
            ON s.id = sp.subscription_id

        WHERE
            ds.doctor_id = ?

        ORDER BY ds.id DESC

        LIMIT 1
        `,
        [doctorId]
    );

    return rows[0] || null;

}


    // ==========================
    // MY SUBSCRIPTION
    // ==========================
    async getCurrentSubscription(
    doctorId: number
) {

    const [rows]: any = await pool.query(
        `
        SELECT

            ds.*,

            s.plan_name,

            s.operational_record_limit,

            s.template_limit,

            s.storage_limit,

            sp.amount,

            sp.frequency

        FROM doctor_subscriptions ds

        INNER JOIN subscription_plans sp
            ON sp.id = ds.plan_id

        INNER JOIN subscriptions s
            ON s.id = sp.subscription_id

        WHERE
            ds.doctor_id = ?
            AND ds.payment_status = 'SUCCESS'

        ORDER BY ds.id DESC

        LIMIT 1
        `,
        [doctorId]
    );

    return rows[0] || null;
}

    // ==========================
    // SUBSCRIPTION HISTORY
    // ==========================
    async getHistory(
    doctorId: number
) {

    const [rows]: any = await pool.query(
        `
        SELECT

            ds.*,

            s.plan_name,

            s.operational_record_limit,

            s.template_limit,

            s.storage_limit,

            sp.amount,

            sp.frequency

        FROM doctor_subscriptions ds

        INNER JOIN subscription_plans sp
            ON sp.id = ds.plan_id

        INNER JOIN subscriptions s
            ON s.id = sp.subscription_id

        WHERE
            ds.doctor_id = ?

        ORDER BY ds.id DESC
        `,
        [doctorId]
    );

    return rows;
}

}