import { NotificationService } from "./notification.service";

export class NotificationController {

    static async myNotifications({ store }: any) {

        const data = await NotificationService.getMyNotifications(
            store.user.id
        );

        return {
            success: true,
            data,
        };
    }

    static async markAsRead({ params }: any) {

        await NotificationService.markAsRead(params.id);

        return {
            success: true,
            message: "Notification marked as read",
        };
    }
}