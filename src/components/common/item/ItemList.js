import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ComponentLoader from '../ComponentLoader';
import ItemCard from './ItemCard';
import ItemHeader from './ItemHeader';
import Note from '../Note';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  NOTE_NO_API_KEY,
  NOTE_OFFLINE,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  itemListContainer: {
    padding: theme.spacing(0, 2),
  },
  note: {
    padding: theme.spacing(8, 2),
  },
  titleContainer: {
    padding: theme.spacing(15, 0),
  },
}));

const ItemList = () => {
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const movieCategory = useSelector((state) => state.movies.category);
  const movieList = useSelector((state) => state.movies.list);
  const movieLoadedContent = useSelector((state) => state.movies.loadedContent);
  const tvShowCategory = useSelector((state) => state.tvShows.category);
  const tvShowList = useSelector((state) => state.tvShows.list);
  const tvShowLoadedContent = useSelector((state) => state.tvShows.loadedContent);

  const isMovie = activeTab === 'movies';
  const contentList = isMovie ? movieList : tvShowList;
  const categoryChips = isMovie ? MOVIE_DRAWER_CATEGORY_CHIPS : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const loadedContent = isMovie ? movieLoadedContent : tvShowLoadedContent;
  const activeCategory = isMovie ? movieCategory : tvShowCategory;

  if (!window.navigator.onLine) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_OFFLINE} />
      </div>
    );
  }

  if (localStorage.getItem('apiKey') === null) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_NO_API_KEY} />
      </div>
    );
  }

  if (loadedContent !== categoryChips.length) {
    return (
      <ComponentLoader />
    );
  }

  return (
    <Grid container justify="center" className={classes.itemListContainer}>
      <Grid
        alignItems="center"
        className={classes.titleContainer}
        container
        direction="column"
        item
        justify="center"
        xs={12}
      >
        <ItemHeader />
      </Grid>
      <Grid container item xs={12}>
        {contentList[activeCategory].slice(0, 10).map((content, rank) => (
          <Grid
            className={classes.itemListCard}
            item
            key={`item-list-grid-item-card-${content.id}`}
            xs={12}
          >
            <ItemCard
              col={12}
              content={content}
              drawerOpen
              mobile
              rank={rank + 1}
              type={activeTab}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ItemList;
