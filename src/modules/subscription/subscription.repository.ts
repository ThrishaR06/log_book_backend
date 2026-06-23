import { pool } from "../../db";

export class SubscriptionRepository {

    // ==========================
    // GET ALL ACTIVE PLANS
    // ==========================
    async getPlans() {

        const [rows]: any = await pool.query(
            `
            SELECT
                id,
                name,
                description,
                amount,
                duration_days,
                is_active,
                created_at,
                updated_at
            FROM subscription_plans
            WHERE is_active = 1
            ORDER BY amount ASC
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
            SELECT *
            FROM subscription_plans
            WHERE id = ?
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
            INSERT INTO subscriptions
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
            FROM subscriptions
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
            FROM subscriptions
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
        UPDATE subscriptions
        SET
            payment_id = ?,
            payment_status = ?,
            transaction_id = ?,
            payment_method = ?,
            start_date = ?,
            expiry_date = ?,
            updated_at = NOW()
        WHERE order_id = ?
        `,
        [
            data.paymentId,
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
        UPDATE subscriptions
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

            s.*,

            p.duration_days

        FROM subscriptions s

        INNER JOIN subscription_plans p

            ON p.id = s.plan_id

        WHERE s.order_id = ?

        LIMIT 1
        `,
        [orderId]
    );

    return rows[0] || null;
}

    // ==========================
    // UPDATE PAYMENT SUCCESS
    // ==========================
    async updatePayment(data: any) {

        await pool.query(
            `
            UPDATE subscriptions
            SET
                payment_status = ?,
                payment_id = ?,
                transaction_id = ?,
                payment_method = ?,
                start_date = ?,
                expiry_date = ?
            WHERE order_id = ?
            `,
            [
                data.paymentStatus,
                data.paymentId,
                data.transactionId,
                data.paymentMethod,
                data.startDate,
                data.expiryDate,
                data.orderId
            ]
        );
    }

    // ==========================
    // UPDATE PAYMENT FAILED
    // ==========================
    async updatePaymentStatus(
        orderId: string,
        status: string
    ) {

        await pool.query(
            `
            UPDATE subscriptions
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
                payment_id,
                payment_status,
                request_data,
                response_data
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [
                data.orderId,
                data.paymentId,
                data.paymentStatus,
                JSON.stringify(data.requestData),
                JSON.stringify(data.responseData)
            ]
        );
    }

    async mySubscription(doctorId: number) {

    const [rows]: any = await pool.query(
        `
        SELECT *
        FROM subscriptions
        WHERE doctor_id = ?
        ORDER BY id DESC
        LIMIT 1
        `,
        [doctorId]
    );

    return rows[0] || null;

}

async subscriptionHistory(doctorId: number) {

    const [rows]: any = await pool.query(
        `
        SELECT *
        FROM subscriptions
        WHERE doctor_id = ?
        ORDER BY id DESC
        `,
        [doctorId]
    );

    return rows;

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

                s.*,

                p.name,

                p.duration_days

            FROM subscriptions s

            INNER JOIN subscription_plans p

                ON p.id = s.plan_id

            WHERE

                s.doctor_id = ?

                AND s.payment_status = 'SUCCESS'

            ORDER BY s.id DESC

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

                s.*,

                p.name

            FROM subscriptions s

            INNER JOIN subscription_plans p

                ON p.id = s.plan_id

            WHERE

                s.doctor_id = ?

            ORDER BY s.id DESC
            `,
            [doctorId]
        );

        return rows;
    }

}