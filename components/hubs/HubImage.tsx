import Image from "next/image";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { HubImage as HubImageData } from "@/lib/hubs";

interface HubImageProps {
  image: HubImageData;
  aspectRatio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a real image when `image.src` is set, otherwise a labelled gradient
 * placeholder — so hub and project pages look complete before real photos are
 * dropped into the config.
 */
export default function HubImage({
  image,
  aspectRatio = "aspect-[4/3]",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: HubImageProps) {
  if (!image.src) {
    return (
      <ImagePlaceholder
        variant={image.variant}
        label={image.label}
        aspectRatio={aspectRatio}
        className={className}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${aspectRatio} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
