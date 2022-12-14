export interface INotification {
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private data: INotification;

  constructor(data: INotification) {
    this.data = data;
  }

  public set content(content: string) {
    this.data.content = content;
  }

  public get content(): string {
    return this.data.content;
  }
}
