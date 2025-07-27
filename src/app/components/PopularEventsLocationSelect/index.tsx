"use client";

import { useEffect, useState } from "react";

type Location = {
  id: number;
  name: string;
  city: string;
  country: string;
  imageUrl: string;
};

type Props = {
  onChange: (locationId: number | undefined) => void;
};

export function PopularEventsLocationSelect({ onChange }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<number | "">("");

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("/api/locations");
      const data = await res.json();
      setLocations(data.locations);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    onChange(selected === "" ? undefined : selected);
  }, [selected, onChange]);

  return (
    <select
      value={selected}
      onChange={(e) => {
        const val = e.target.value;
        setSelected(val === "" ? "" : Number(val));
      }}
      className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
    >
      <option value="">All locations</option>
      {locations.map((loc) => (
        <option key={loc.id} value={loc.id}>
          {loc.name}
        </option>
      ))}
    </select>
  );
}
