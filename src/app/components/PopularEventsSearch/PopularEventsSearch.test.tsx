import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PopularEventsSearch } from "../PopularEventsSearch";

jest.mock("@/hooks/useDebouncedValue", () => ({
  useDebouncedValue: (v: string) => v,
}));

describe("PopularEventsSearch", () => {
  it("renders input with placeholder", () => {
    render(<PopularEventsSearch onSearch={() => {}} />);
    expect(screen.getByPlaceholderText("Search events...")).toBeInTheDocument();
  });

  it("calls onSearch immediately with typed value", async () => {
    const onSearchMock = jest.fn();
    render(<PopularEventsSearch onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText("Search events...");
    await userEvent.type(input, "Rock");
    expect(onSearchMock).toHaveBeenLastCalledWith("Rock");
  });
});
