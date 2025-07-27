"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type Props = {
  onSearch: (value: string) => void;
};

export function PopularEventsSearch({ onSearch }: Props) {
  const [input, setInput] = useState("");
  const debounced = useDebouncedValue(input, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search events..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full border rounded px-3 py-2 mb-2 text-black"
    />
  );
}
