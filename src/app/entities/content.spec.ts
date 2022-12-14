import { Content } from "./content";

describe("Notification Content", () => {
  it("Should be able to create a notification content", () => {
    const content = new Content("New notification!!");

    expect(content).toBeTruthy();
  });

  it("Should not be able to create a notification content with less than 5 letters", () => {
    expect(() => new Content("abc")).toThrow();
  });
  it("Should not be able to create a notification content with more than 240 letters", () => {
    expect(() => new Content("a".repeat(241))).toThrow();
  });
});
