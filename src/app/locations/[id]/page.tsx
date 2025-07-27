import { notFound } from "next/navigation";
import Image from "next/image";
import { rootUrl } from "@/lib/consts";
import { normalizeImageUrl } from "@/utils/normalizeImageUrl";

type Props = {
  params: { id: string };
};

export default async function LocationDetailsPage({ params }: Props) {
  const res = await fetch(`${rootUrl}/api/locations/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const location = await res.json();

  return (
    <div>
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={normalizeImageUrl(location.imageUrl)}
          alt={location.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{location.name}</h1>

        <p className="text-gray-600 mb-4">
          {location.city}, {location.country}
        </p>
      </div>
    </div>
  );
}
