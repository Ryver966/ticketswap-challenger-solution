import { database } from "@/lib/mock-db";

type GetLocationParams = {
  id: string;
};

type GetLocationArgs = {
  params: GetLocationParams;
};

export async function GET(_request: Request, { params }: GetLocationArgs) {
  const locationId = Number(params.id);

  if (isNaN(locationId)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  const location = await database.getLocation(locationId);

  if (!location) {
    return new Response(JSON.stringify({ error: "Location not found" }), {
      status: 404,
    });
  }

  return Response.json(location);
}
