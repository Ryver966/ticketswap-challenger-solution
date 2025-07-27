import { database } from "@/lib/mock-db";

export async function GET() {
  const locations = await database.getEventLocations();
  return Response.json({ locations });
}
