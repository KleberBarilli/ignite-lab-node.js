import { Content } from "./content";

export interface INotification {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private data: INotification;

  constructor(data: INotification) {
    this.data = data;
  }
  public get recipientId(): string {
    return this.data.recipientId;
  }

  public set recipientId(content: string) {
    this.data.recipientId = this.recipientId;
  }

  public get content(): Content {
    return this.data.content;
  }
  public set content(content: Content) {
    this.data.content = content;
  }
  public get category(): string {
    return this.data.category;
  }
  public set category(category: string) {
    this.data.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.data.readAt;
  }
  public set readAt(readAt: Date | null | undefined) {
    this.data.readAt = this.readAt;
  }

  public get createdAt(): Date {
    return this.data.createdAt;
  }
}
