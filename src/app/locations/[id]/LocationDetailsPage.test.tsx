import { render, screen } from "@testing-library/react";
import LocationDetailsPage from "../[id]/page";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/utils/normalizeImageUrl", () => ({
  normalizeImageUrl: (url: string) => url + ".png",
}));

const mockLocation = {
  id: 5,
  name: "Amsterdam Arena",
  city: "Amsterdam",
  country: "Netherlands",
  imageUrl: "https://placehold.co/600x400?text=Amsterdam",
};

describe("LocationDetailsPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLocation),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders location name, city, country, and image", async () => {
    render(await LocationDetailsPage({ params: { id: "5" } }));

    expect(screen.getByText("Amsterdam Arena")).toBeInTheDocument();
    expect(screen.getByText("Amsterdam, Netherlands")).toBeInTheDocument();
    expect(screen.getByAltText("Amsterdam Arena")).toBeInTheDocument();
  });
});
