import { Replace } from "../../helpers/Replace";
import { Content } from "./content";
import { randomUUID } from "node:crypto";

export interface INotification {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private data: INotification;

  constructor(data: Replace<INotification, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.data = { ...data, createdAt: data.createdAt ?? new Date() };
  }
  public get id(): string {
    return this._id;
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
  public read() {
    this.data.readAt = new Date();
  }
  public unread() {
    this.data.readAt = null;
  }

  public get canceledAt(): Date | null | undefined {
    return this.data.canceledAt;
  }
  public cancel() {
    this.data.canceledAt = new Date();
  }

  public get createdAt(): Date {
    return this.data.createdAt;
  }
}
