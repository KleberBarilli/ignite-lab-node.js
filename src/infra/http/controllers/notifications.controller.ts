import { CancelNotification } from "@app/use-cases/cancel-notification";
import { CountRecipientNotifications } from "@app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@app/use-cases/get-recipient-notifications";
import { ReadNotification } from "@app/use-cases/read-notification";
import { UnreadNotification } from "@app/use-cases/unread-notification";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { SendNotification } from "src/app/use-cases/send-notification";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { NotificationPresenter } from "../presenters/notification-presenter";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientsNotifications: GetRecipientNotifications,
  ) {}

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get(":count/from/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get("from/:recipientId")
  async getFromRecipient(@Param("id") id: string) {
    const { notifications } = await this.getRecipientsNotifications.execute({
      recipientId: id,
    });

    return {
      notifications: notifications.map(NotificationPresenter.toHTTP),
    };
  }

  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(":id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, recipientId, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationPresenter.toHTTP(notification),
    };
  }
}
