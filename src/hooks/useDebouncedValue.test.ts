import { renderHook, act } from "@testing-library/react";
import { useDebouncedValue } from "./useDebouncedValue";

jest.useFakeTimers();

describe("useDebouncedValue", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("test"));
    expect(result.current).toBe("test");
  });

  it("does not update value before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 500),
      { initialProps: { value: "initial" } }
    );

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current).toBe("initial");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 500),
      { initialProps: { value: "initial" } }
    );

    rerender({ value: "updated" });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("resets timer if value changes quickly", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    act(() => jest.advanceTimersByTime(200));

    rerender({ value: "c" });
    act(() => jest.advanceTimersByTime(200));

    expect(result.current).toBe("a");

    act(() => jest.advanceTimersByTime(100));
    expect(result.current).toBe("c");
  });
});
