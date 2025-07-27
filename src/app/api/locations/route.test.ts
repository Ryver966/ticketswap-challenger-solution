import { GET } from "./route";
import { database } from "@/lib/mock-db";

jest.mock("@/lib/mock-db", () => ({
  database: {
    getEventLocations: jest.fn(),
  },
}));

describe("GET /api/locations", () => {
  it("returns locations from the database", async () => {
    const mockLocations = [
      {
        id: 1,
        name: "Wembley",
        city: "London",
        country: "UK",
        imageUrl: "...",
      },
    ];

    (database.getEventLocations as jest.Mock).mockResolvedValue(mockLocations);

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.locations).toEqual(mockLocations);
    expect(database.getEventLocations).toHaveBeenCalled();
  });
});
