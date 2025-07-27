"use client";

import { Calendar, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PopularEventsSearch } from "../PopularEventsSearch";
import { PopularEventsLocationSelect } from "../PopularEventsLocationSelect";
import { useRouter } from "next/navigation";

export function PopularEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationId, setLocationId] = useState<number | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const fetchPopularEvents = async () => {
      setLoading(true);

      const params = new URLSearchParams({ amount: "6" });
      if (search.trim()) params.set("search", search.trim());
      if (locationId !== undefined)
        params.set("locationId", locationId.toString());

      const data = await fetch(`/api/events/popular?${params.toString()}`).then(
        (response) => response.json()
      );

      setEvents(data.events);
      setLoading(false);
    };

    fetchPopularEvents();
  }, [search, locationId]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <h1 className="text-xl text-black md:col-span-3 flex items-center gap-2">
        <Calendar /> Popular events
      </h1>

      <div className="md:col-span-3">
        <PopularEventsSearch onSearch={setSearch} />
        <PopularEventsLocationSelect onChange={setLocationId} />
      </div>

      {loading && (
        <div className="grid place-items-center md:col-span-3 p-10">
          <Loader className="animate-spin" />
        </div>
      )}

      {events.length ? (
        events.map((event) => (
          <div
            key={event.id}
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
            onClick={() => router.push(`/events/${event.id}`)}
          >
            <div className="absolute inset-x-0 bottom-0 p-2 bg-black/40">
              <h1 className="text-sm text-white">{event.name}</h1>
              <p className="text-xs text-gray-200">
                {event.locationId} - {new Date(event.date).toLocaleDateString()}
              </p>
            </div>

            <Image
              className="object-cover h-full w-full"
              src={event.imageUrl}
              width={320}
              height={200}
              alt={event.name}
            />
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400 italic">
          No events matches criteria
        </p>
      )}
    </div>
  );
}
