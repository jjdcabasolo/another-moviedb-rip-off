import React from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import ItemCard from '../../common/item/ItemCard';

const MovieCollection = () => {
  const theme = useTheme();
  const isSmallTabletDown = useMediaQuery(theme.breakpoints.down('sm'));

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const movie = useSelector((state) => state.movies.movie);

  const { collection_content: collectionContent } = movie;

  if (!collectionContent) return null;

  const { overview, parts } = collectionContent;

  return (
    <Grid item container spacing={4}>
      {overview.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="body1">
            {overview}
          </Typography>
        </Grid>
      )}
      <Grid container item xs={12} spacing={2}>
        {parts.map((item, index) => (
          <ItemCard
            col={isSmallTabletDown ? 12 : 6}
            content={item}
            rank={index + 1}
            type={activeTab}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default MovieCollection;
