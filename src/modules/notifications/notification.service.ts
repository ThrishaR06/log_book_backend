import { db } from "../../db";
import { notifications } from "../../db/schema/notifications";
import { eq } from "drizzle-orm";

export class NotificationService {

    static async create(data: any) {

        const result = await db
            .insert(notifications)
            .values({
                doctorId: data.doctorId,
                title: data.title,
                message: data.message,
            });

        return result;
    }

    static async getMyNotifications(doctorId: number) {

        return await db
            .select()
            .from(notifications)
            .where(eq(notifications.doctorId, doctorId))
            .orderBy(notifications.createdAt);
    }

    static async markAsRead(id: number) {

        return await db
            .update(notifications)
            .set({ isRead: true })
            .where(eq(notifications.id, id));
    }
}