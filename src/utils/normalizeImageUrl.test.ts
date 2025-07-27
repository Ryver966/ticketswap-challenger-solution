import { normalizeImageUrl } from "./normalizeImageUrl";

describe("normalizeImageUrl", () => {
  it("appends .png if placehold.co URL has no extension", () => {
    const input = "https://placehold.co/600x400?text=Test";
    const output = normalizeImageUrl(input);
    expect(output).toBe("https://placehold.co/600x400.png?text=Test");
  });

  it("returns original URL if not from placehold.co", () => {
    const input = "https://example.com/image?query=abc";
    const output = normalizeImageUrl(input);
    expect(output).toBe(input);
  });

  it("handles URL without query string", () => {
    const input = "https://placehold.co/600x400";
    const output = normalizeImageUrl(input);
    expect(output).toBe("https://placehold.co/600x400.png");
  });
});
