import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { InMemoryNotificationsRepository } from "../repositories/fakes/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count Recipient Notifications", () => {
  it("Should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipíentNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = new Notification({
      category: "social",
      content: new Content("Nova solicitação"),
      recipientId: "12341564",
    });

    const notification2 = new Notification({
      category: "welcome",
      content: new Content("Boas Vindas"),
      recipientId: "12341564",
    });

    const notification3 = new Notification({
      category: "welcome",
      content: new Content("Boas Vindas"),
      recipientId: "another",
    });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { count } = await countRecipíentNotifications.execute({
      recipientId: "12341564",
    });

    expect(count).toEqual(2);
  });
});
