import Image from "next/image";
import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";

interface BlogCardProps {
  href: string;
  thumbnail: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

export default function BlogCard({
  href,
  thumbnail,
  tag,
  date,
  title,
  excerpt,
}: BlogCardProps) {
  return (
    <article className="bg-paper rounded-lg overflow-hidden border border-line hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full">
      <div className="relative aspect-[16/9]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-green-d bg-green-ll px-2 py-0.5 rounded-pill">
            {tag}
          </span>
          <span className="text-xs text-ink-3 font-sans">{date}</span>
        </div>
        <h3 className="font-sans font-bold text-sm text-ink leading-snug">
          {title}
        </h3>
        <p className="text-xs text-ink-2 leading-relaxed flex-1">{excerpt}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
        >
          Read more <TbArrowRight aria-hidden />
        </Link>
      </div>
    </article>
  );
}
