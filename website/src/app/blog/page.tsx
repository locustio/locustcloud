import { sanityFetch } from "sanity/client";
import { IBlog } from "app/blog/blog.types";
import Blog from "components/Blog/Blog";

const BLOGS_QUERY = `*[
  _type == "blog"
]|order(publishedAt desc){_id, author, title, description, "imageUrl": image.asset->url, publishedAt, slug}`;

export const metadata = {
  title: "Blog",
  description:
    "Learn about load testing with Locust, a favourite performance testing tool amongst developers, allowing you to express your load tests in plain Python!",
  openGraph: {
    description:
      "Learn about load testing with Locust, a favourite performance testing tool amongst developers, allowing you to express your load tests in plain Python!",
  },
};

export default async function BlogPage() {
  const blogs = await sanityFetch<IBlog[]>(BLOGS_QUERY);

  return <Blog blogs={blogs} />;
}
