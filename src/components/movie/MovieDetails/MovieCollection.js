import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import ItemHorizontalList from '../../common/item/ItemHorizontalList';

const MovieCollection = ({ anchorId }) => {
  const movie = useSelector((state) => state.movies.movie);

  const { collection_content: collectionContent } = movie;

  if (!collectionContent) return null;

  const { overview, parts } = collectionContent;

  return (
    <ItemHorizontalList
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
