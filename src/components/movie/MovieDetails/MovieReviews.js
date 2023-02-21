import React from "react";

import { useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import ItemLazyLoad from "../../common/item/ItemLazyLoad";
import ItemReview from "../../common/item/ItemReview";
import ItemSeeMore from "../../common/item/ItemSeeMore";

import { scrollToID } from "../../../utils/functions";

const SECTION_ID = "reviews";

const MovieReviews = () => {
  const movie = useSelector((state) => state.movies.movie);

  const { original_title: originalTitle, reviews, title } = movie;

  if (!reviews) return null;

  const reviewsUI = reviews.map((review, index) => {
    const { author, author_details, created_at: date, content } = review;

    const { rating } = author_details;

    return (
      <ItemReview
        author={author}
        content={content}
        date={date}
        rating={rating}
        divider={index !== 0}
      />
    );
  });

  return (
    <Grid container>
      <ItemSeeMore
        appbarTitle={[title || originalTitle, "Reviews"]}
        collapsedClickEvent={() => scrollToID("movie-reviews")}
        collapsedContent={reviewsUI[0]}
        expandedContent={
          <ItemLazyLoad
            contents={reviews}
            maxItemPerLoad={5}
            node={<ItemReview />}
            type="itemReviews"
          />
        }
        isButtonShown={reviews.length > 1}
        isEpisode
        sectionId={SECTION_ID}
        seeMoreText={`Show all ${reviews.length} reviews`}
      />
    </Grid>
  );
};

export default MovieReviews;
