import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import ItemCardHorizontalList from '../../common/item/ItemCardHorizontalList';

const MovieCollection = ({ anchorId }) => {
  const movie = useSelector((state) => state.movies.movie);

  const {
    collection_content: collectionContent,
    original_title: originalTitle,
    title,
  } = movie;

  if (!collectionContent) return null;

  const { overview, parts } = collectionContent;

  return (
    <ItemCardHorizontalList
      appbarTitle={[title || originalTitle, 'Collection']}
      anchorId={anchorId}
      items={parts}
      isOverviewCollapsed
      overview={overview}
    />
  );
};

MovieCollection.propTypes = {
  anchorId: PropTypes.string.isRequired,
};

export default MovieCollection;
