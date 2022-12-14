import { InMemoryNotificationsRepository } from "../repositories/fakes/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

describe("Send Notification", () => {
  it("Should be able to send a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: "12346",
      content: "Hello world",
      category: "REGISTER",
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationsRepository.notifications[0]);
  });
});
