import { makeNotification } from "@app/repositories/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../repositories/fakes/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe("Read Notification", () => {
  it("Should be able to unread a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it("Should not be able to unread a non existing notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({ notificationId: "Fake-ID" });
    }).rejects.toThrow(NotificationNotFound);
  });
});
