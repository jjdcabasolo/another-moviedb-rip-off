import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import ItemHorizontalList from '../../common/item/ItemHorizontalList';

const MovieRecommendations = ({ anchorId }) => {
  const movie = useSelector((state) => state.movies.movie);

  const {
    original_title: originalTitle,
    title,
    recommendations,
  } = movie;

  if (!recommendations) return null;

  return (
    <ItemHorizontalList
      anchorId={anchorId}
      items={recommendations}
      overview={`If you liked ${title || originalTitle}, check out these other movies:`}
    />
  );
};

MovieRecommendations.propTypes = {
  anchorId: PropTypes.string.isRequired,
};

export default MovieRecommendations;
