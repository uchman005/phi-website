import type { Metadata } from "next";

// Must match the `title.template` suffix in app/layout.tsx.
const SUFFIX = " | Passion of Hope International";

// Google shows roughly 60 characters of a title before truncating.
const MAX_TITLE_LENGTH = 60;

/**
 * A page title that keeps the site-name suffix when it fits, and drops it
 * (via `absolute`) when the suffix would push the title past what search
 * results display.
 */
export function pageTitle(title: string): Metadata["title"] {
  return title.length + SUFFIX.length <= MAX_TITLE_LENGTH
    ? title
    : { absolute: title };
}

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/** Default link-preview image (896×469, cropped from the homepage hero). */
export const SHARE_IMAGE = {
  url: "/images/og/phi-share.jpg",
  width: 896,
  height: 469,
  alt: "Passion of Hope International — community-led development in rural Africa",
};

/**
 * Next shallow-merges metadata, so a page that sets its own `openGraph`
 * replaces the layout's — including its image. Wrap every page's
 * `openGraph` in this so link previews always carry an image.
 */
export function withShareImage(og: OpenGraph): OpenGraph {
  return { ...og, images: og.images ?? [SHARE_IMAGE] };
}
