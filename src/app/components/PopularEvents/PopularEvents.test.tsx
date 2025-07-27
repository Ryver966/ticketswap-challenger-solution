import { render, screen, waitFor } from "@testing-library/react";
import { PopularEvents } from "../PopularEvents";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../PopularEventsSearch", () => ({
  PopularEventsSearch: ({ onSearch }: { onSearch: (v: string) => void }) => (
    <input
      placeholder="Search"
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search"
    />
  ),
}));

jest.mock("../PopularEventsLocationSelect", () => ({
  PopularEventsLocationSelect: ({
    onChange,
  }: {
    onChange: (v: number | undefined) => void;
  }) => (
    <select
      data-testid="location"
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="">All</option>
      <option value="1">Loc 1</option>
    </select>
  ),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        events: [
          {
            id: 1,
            name: "Test Event",
            imageUrl: "https://placehold.co/600x400.png?text=Test",
            locationId: 1,
            date: "2025-07-27T18:00:00Z",
          },
        ],
      }),
  })
) as jest.Mock;

describe("PopularEvents", () => {
  it("renders events after loading", async () => {
    render(<PopularEvents />);
    expect(await screen.findByText("Test Event")).toBeInTheDocument();
    expect(screen.getByAltText("Test Event")).toBeInTheDocument();
  });

  it("renders fallback when no events match", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ events: [] }),
      })
    );

    render(<PopularEvents />);
    expect(await screen.findByText(/No events matches/i)).toBeInTheDocument();
  });

  it("filters by search and location", async () => {
    render(<PopularEvents />);
    const searchInput = screen.getByTestId("search");
    const locationSelect = screen.getByTestId("location");

    await userEvent.type(searchInput, "Rock");
    await userEvent.selectOptions(locationSelect, "1");

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("search=Rock")
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("locationId=1")
      );
    });
  });
});
