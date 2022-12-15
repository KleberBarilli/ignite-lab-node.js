import { Content } from "@app/entities/content";
import { Notification, INotification } from "@app/entities/notification";

type Override = Partial<INotification>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "social",
    content: new Content("Nova solicitação"),
    recipientId: "12341564",
    ...override,
  });
}
