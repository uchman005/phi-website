import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  crumbs?: Crumb[];
  headline: string;
  sub?: string;
}

export default function PageHero({ crumbs, headline, sub }: PageHeroProps) {
  return (
    <section className="bg-green-ll py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-ink-3 font-sans">
              <li>
                <Link href="/" className="hover:text-green-dd transition-colors">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span aria-hidden>/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-green-dd transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-2">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight max-w-3xl">
          {headline}
        </h1>
        {sub && (
          <p className="mt-4 text-lg text-ink-2 max-w-2xl font-sans">{sub}</p>
        )}
      </div>
    </section>
  );
}
