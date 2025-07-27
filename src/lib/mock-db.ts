import { getEvents, getLocations } from "./mock-data";

type GetPopularEventsParams = {
  amount: number;
  offset: number;
  search?: string;
  locationId?: number;
};

export const database = {
  getPopularEvents: async ({
    amount,
    offset,
    search,
    locationId,
  }: GetPopularEventsParams) => {
    const events = await getEvents();

    let result = events;

    if (search) {
      result = result.filter((event) =>
        event.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (locationId) {
      result = result.filter((event) => event.locationId === locationId);
    }

    return result
      .toSorted((a, b) => b.alerts - a.alerts)
      .slice(offset, amount + offset);
  },

  getEvent: async (id: number) => {
    const events = await getEvents();
    return events.find((event) => event.id === id) ?? null;
  },

  getEventLocations: async () => {
    const events = await getEvents();
    const locations = await getLocations();

    const usedLocationIds = new Set(events.map((e) => e.locationId));
    return locations.filter((location) => usedLocationIds.has(location.id));
  },

  getLocation: async (id: number) => {
    const locations = await getLocations();
    return locations.find((loc) => loc.id === id) ?? null;
  },
};
