import { GET } from "./route";
import { database } from "@/lib/mock-db";

jest.mock("@/lib/mock-db", () => ({
  database: {
    getEvent: jest.fn(),
    getLocation: jest.fn(),
  },
}));

const createRequest = (id: string) => {
  return {
    params: { id },
  } as any;
};

describe("GET /api/events/[id]", () => {
  it("returns 400 if ID is invalid", async () => {
    const res = await GET(new Request(""), createRequest("abc"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid ID");
  });

  it("returns 404 if event not found", async () => {
    (database.getEvent as jest.Mock).mockResolvedValueOnce(null);

    const res = await GET(new Request(""), createRequest("999"));
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe("Event not found");
  });

  it("returns event and location when valid", async () => {
    const mockEvent = {
      id: 1,
      name: "Test Event",
      locationId: 5,
    };

    const mockLocation = {
      id: 5,
      name: "Wembley",
    };

    (database.getEvent as jest.Mock).mockResolvedValueOnce(mockEvent);
    (database.getLocation as jest.Mock).mockResolvedValueOnce(mockLocation);

    const res = await GET(new Request(""), createRequest("1"));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({
      event: mockEvent,
      location: mockLocation,
    });
  });
});
