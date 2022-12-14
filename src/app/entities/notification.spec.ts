import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("Should be able to create a notification", () => {
    const notification = new Notification({
      content: new Content("New message"),
      category: "Message",
      recipientId: "1234564",
    });

    expect(notification).toBeTruthy();
  });
});
