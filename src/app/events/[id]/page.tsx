import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { rootUrl } from "@/lib/consts";

type EventDetailsPageProps = {
  params: { id: string };
};

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const res = await fetch(`${rootUrl}/api/events/${params.id}`);

  if (!res.ok) {
    notFound();
  }

  const { event, location } = await res.json();

  return (
    <div>
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{event.name}</h1>

        <div className="text-gray-600 mb-4 flex items-center justify-between flex-wrap gap-2">
          <span>
            {location.name}, {location.city}, {location.country}
          </span>

          <Link
            href={`/locations/${location.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            See location details
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          {new Date(event.date).toLocaleString()}
        </p>

        {event.description ? (
          <p className="text-base leading-relaxed">{event.description}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">
            No description available.
          </p>
        )}
      </div>
    </div>
  );
}
