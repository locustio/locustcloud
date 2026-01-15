/* eslint-disable @typescript-eslint/no-unused-vars */
import { sanityFetch } from "sanity/client";
import Reviews from "components/Reviews/Reviews";
import { IReview } from "components/Reviews/review.types";

const REVIEW_SHOWCASE_QUERY = `*[_type == "reviewShowcase"][0] {
    reviews[]->{
        name,
        review,
        link,
        role,
        company,
    }
}`;

export default async function ReviewsContainer() {
  const { reviews } = await sanityFetch<{
    reviews: IReview[];
  }>(REVIEW_SHOWCASE_QUERY);

  return; 
  //   <Reviews reviews={reviews} />;
}
