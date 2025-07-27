import { render, screen, waitFor } from "@testing-library/react";
import { PopularEventsLocationSelect } from "../PopularEventsLocationSelect";
import userEvent from "@testing-library/user-event";

const mockLocations = {
  locations: [
    {
      id: 1,
      name: "Amsterdam",
      city: "Amsterdam",
      country: "Netherlands",
      imageUrl: "https://placehold.co/600x400?text=Amsterdam",
    },
    {
      id: 2,
      name: "Berlin",
      city: "Berlin",
      country: "Germany",
      imageUrl: "https://placehold.co/600x400?text=Berlin",
    },
  ],
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockLocations),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("PopularEventsLocationSelect", () => {
  it("renders all fetched locations as options", async () => {
    render(<PopularEventsLocationSelect onChange={() => {}} />);

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Amsterdam" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Berlin" })
      ).toBeInTheDocument();
    });
  });

  it("calls onChange with undefined when 'All locations' is selected", async () => {
    const onChangeMock = jest.fn();

    render(<PopularEventsLocationSelect onChange={onChangeMock} />);

    const select = await screen.findByRole("combobox");

    await userEvent.selectOptions(select, "");

    expect(onChangeMock).toHaveBeenCalledWith(undefined);
  });
});
