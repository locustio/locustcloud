import { ClientPerspective, createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,

  token: process.env.SANITY_VIEWER_TOKEN,
  perspective: "published",
  stega: {
    studioUrl: "/studio",
  },
});

const previewOptions = process.env.ENABLE_PRESENTATION_TOOL
  ? { stega: true, perspective: "drafts" as ClientPerspective }
  : {};

const { projectId, dataset } = client.config();
export const urlFor = (source?: SanityImageSource) =>
  source && projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : undefined;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
    ...previewOptions,
    ...options,
  });
}
