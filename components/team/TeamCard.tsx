import Image from "next/image";
import { TbMapPin } from "react-icons/tb";

interface TeamCardProps {
  name: string;
  role: string;
  photo: string;
  location?: string;
  bio?: string;
}

export default function TeamCard({
  name,
  role,
  photo,
  location,
  bio,
}: TeamCardProps) {
  return (
    <article className="bg-cream rounded-lg overflow-hidden border border-line flex flex-col h-full">
      <div className="relative aspect-square">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-sans font-bold text-sm text-ink">{name}</h3>
        <p className="font-sans text-xs text-green-d font-semibold">{role}</p>
        {location && (
          <div className="flex items-center gap-1 text-xs text-ink-3">
            <TbMapPin className="shrink-0" aria-hidden />
            <span>{location}</span>
          </div>
        )}
        {bio && (
          <p className="text-xs text-ink-2 leading-relaxed mt-1">{bio}</p>
        )}
      </div>
    </article>
  );
}
