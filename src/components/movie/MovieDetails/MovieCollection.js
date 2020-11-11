import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import ItemCard from '../../common/item/ItemCard';
import ItemHorizontalContainer from '../../common/item/ItemHorizontalContainer';

const useStyles = makeStyles((theme) => ({
  collectionContainer: {
    position: 'relative',
  },
  horizontalScrollItemSpacing: {
    marginRight: theme.spacing(2),
  },
}));

const MovieCollection = () => {
  const theme = useTheme();
  const classes = useStyles();

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
      <Grid item xs={12} container className={classes.collectionContainer}>
        <ItemHorizontalContainer
          imageSize={theme.spacing(23)}
          scrollAmount={theme.spacing(45)}
        >
          {parts.map((item, index) => (
            <div className={classes.horizontalScrollItemSpacing}>
              <Grid container>
                <ItemCard
                  col={12}
                  content={item}
                  isHorizontalScroll
                  rank={index + 1}
                  type={activeTab}
                />
              </Grid>
            </div>
          ))}
        </ItemHorizontalContainer>
      </Grid>
    </Grid>
  );
};

export default MovieCollection;
