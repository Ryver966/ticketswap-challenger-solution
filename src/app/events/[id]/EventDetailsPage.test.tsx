import { render, screen } from "@testing-library/react";
import EventDetailsPage from "../[id]/page";

// @ts-ignore
global.fetch = jest.fn();

const mockEvent = {
  id: 1,
  name: "Mocked Event",
  imageUrl: "https://placehold.co/600x400.png?text=Mocked+Event",
  date: "2025-07-27T18:00:00Z",
  locationId: 3,
  description: "This is a mocked event description.",
};

const mockLocation = {
  id: 3,
  name: "Wembley",
  city: "London",
  country: "United Kingdom",
  imageUrl: "https://placehold.co/600x400.png?text=Wembley",
};

describe("EventDetailsPage", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ event: mockEvent, location: mockLocation }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders event details with location and description", async () => {
    render(await EventDetailsPage({ params: { id: "1" } }));

    expect(screen.getByText("Mocked Event")).toBeInTheDocument();
    expect(
      screen.getByText("Wembley, London, United Kingdom")
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is a mocked event description.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /see location details/i })
    ).toHaveAttribute("href", "/locations/3");
    expect(screen.getByAltText("Mocked Event")).toBeInTheDocument();
  });

  it("renders fallback when description is null", async () => {
    const mockEventWithoutDescription = { ...mockEvent, description: null };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        event: mockEventWithoutDescription,
        location: mockLocation,
      }),
    });

    render(await EventDetailsPage({ params: { id: "1" } }));

    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });
});
