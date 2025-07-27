import { database } from "@/lib/mock-db";

type GetEventParams = {
  id: string;
};

type GetEventArgs = {
  params: GetEventParams;
};

export async function GET(_request: Request, { params }: GetEventArgs) {
  const eventId = Number(params.id);

  if (isNaN(eventId)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  const event = await database.getEvent(eventId);

  if (!event) {
    return new Response(JSON.stringify({ error: "Event not found" }), {
      status: 404,
    });
  }

  const location = await database.getLocation(event.locationId);

  return Response.json({ event, location });
}
