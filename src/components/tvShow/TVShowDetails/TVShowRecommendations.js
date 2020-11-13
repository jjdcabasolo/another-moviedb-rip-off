import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import ItemHorizontalList from '../../common/item/ItemHorizontalList';

const TVShowRecommendations = ({ anchorId }) => {
  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    name,
    original_name: originalName,
    recommendations,
  } = tvShow;

  if (!recommendations) return null;

  return (
    <ItemHorizontalList
      anchorId={anchorId}
      items={recommendations}
      overview={`If you liked ${name || originalName}, check out these other TV shows:`}
    />
  );
};

TVShowRecommendations.propTypes = {
  anchorId: PropTypes.string.isRequired,
};

export default TVShowRecommendations;
