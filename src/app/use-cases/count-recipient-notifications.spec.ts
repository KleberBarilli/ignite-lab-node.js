import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { makeNotification } from "@app/repositories/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../repositories/fakes/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count Recipient Notifications", () => {
  it("Should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipíentNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "1" }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: "1" }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: "2" }),
    );

    const { count } = await countRecipíentNotifications.execute({
      recipientId: "1",
    });

    expect(count).toEqual(2);
  });
});
