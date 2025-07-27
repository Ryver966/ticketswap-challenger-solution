import { GET } from "./route";
import { database } from "@/lib/mock-db";

jest.mock("@/lib/mock-db", () => ({
  database: {
    getLocation: jest.fn(),
  },
}));

describe("GET /api/locations/[id]", () => {
  it("returns 400 if ID is invalid", async () => {
    const res = await GET(new Request("http://localhost"), {
      params: { id: "abc" },
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({ error: "Invalid ID" });
  });

  it("returns 404 if location not found", async () => {
    (database.getLocation as jest.Mock).mockResolvedValue(undefined);

    const res = await GET(new Request("http://localhost"), {
      params: { id: "999" },
    });

    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json).toEqual({ error: "Location not found" });
  });

  it("returns location if found", async () => {
    const mockLocation = {
      id: 1,
      name: "Wembley",
      city: "London",
      country: "UK",
      imageUrl: "https://placehold.co/600x400?text=Wembley",
    };

    (database.getLocation as jest.Mock).mockResolvedValue(mockLocation);

    const res = await GET(new Request("http://localhost"), {
      params: { id: "1" },
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual(mockLocation);
  });
});
