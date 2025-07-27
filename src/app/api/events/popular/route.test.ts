import { GET } from "./route";
import { database } from "@/lib/mock-db";

jest.mock("@/lib/mock-db", () => ({
  database: {
    getPopularEvents: jest.fn(),
  },
}));

describe("GET /api/events/popular", () => {
  beforeEach(() => {
    (database.getPopularEvents as jest.Mock).mockResolvedValue([
      { id: 1, name: "Test Event" },
    ]);
  });

  it("returns default 5 events if no params", async () => {
    const res = await GET(
      new Request("https://example.com/api/events/popular")
    );
    const json = await res.json();

    expect(database.getPopularEvents).toHaveBeenCalledWith({
      amount: 5,
      offset: 0,
      search: "",
      locationId: undefined,
    });

    expect(res.status).toBe(200);
    expect(json.events).toHaveLength(1);
  });

  it("passes query params correctly", async () => {
    const res = await GET(
      new Request(
        "https://example.com/api/events/popular?amount=10&offset=3&search=rock&locationId=2"
      )
    );
    await res.json();

    expect(database.getPopularEvents).toHaveBeenCalledWith({
      amount: 10,
      offset: 3,
      search: "rock",
      locationId: 2,
    });
  });

  it("coerces invalid locationId to undefined", async () => {
    const res = await GET(
      new Request("https://example.com/api/events/popular?locationId=abc")
    );
    await res.json();

    expect(database.getPopularEvents).toHaveBeenCalledWith({
      amount: 5,
      offset: 0,
      search: "",
      locationId: undefined,
    });
  });
});
