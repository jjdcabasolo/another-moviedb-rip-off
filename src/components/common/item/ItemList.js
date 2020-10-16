import React, { useEffect, useState } from 'react';

import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ItemCard from './ItemCard';
import ItemCategory from './ItemCategory';
import ComponentLoader from '../ComponentLoader';
import Note from '../Note';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  NOTE_NO_API_KEY,
  NOTE_OFFLINE,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  note: {
    padding: theme.spacing(8, 2),
  },
  loaderContainer: {
    height: theme.browserSize.height - theme.spacing(17),
  },
  loaderText: {
    marginTop: theme.spacing(2),
  },
}));

const getIndexCategoryMapping = (type, movieCategory, tvShowCategory) => {
  if (type === 'movies') {
    if (movieCategory === 'nowPlaying') return 0;
    if (movieCategory === 'upcoming') return 1;
    if (movieCategory === 'popular') return 2;
    if (movieCategory === 'topRated') return 3;
    if (movieCategory === 'highestGrossing') return 4;
  } else if (type === 'tvshows') {
    if (tvShowCategory === 'airingToday') return 0;
    if (tvShowCategory === 'onTheAir') return 1;
    if (tvShowCategory === 'popular') return 2;
    if (tvShowCategory === 'topRated') return 3;
  }
};

const ItemList = () => {
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const movieCategory = useSelector((state) => state.movies.category);
  const movieList = useSelector((state) => state.movies.list);
  const movieLoadedContent = useSelector((state) => state.movies.loadedContent);
  const tvShowCategory = useSelector((state) => state.tvShows.category);
  const tvShowList = useSelector((state) => state.tvShows.list);
  const tvShowLoadedContent = useSelector((state) => state.tvShows.loadedContent);
  const dispatch = useDispatch();

  const [categoryIndex, setCategoryIndex] = useState(0);

  const isMovie = activeTab === 'movies';
  const isTVShow = activeTab === 'tvshows';
  const contentList = isMovie ? movieList : tvShowList;
  const categoryChips = isMovie ? MOVIE_DRAWER_CATEGORY_CHIPS : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const loadedContent = isMovie ? movieLoadedContent : tvShowLoadedContent;

  useEffect(() => {
    setCategoryIndex(getIndexCategoryMapping(activeTab, movieCategory, tvShowCategory));
  }, [activeTab, movieCategory, tvShowCategory]);

  const handleSwipe = (index) => {
    setCategoryIndex(index);
    if (isMovie) dispatch(moviesActions.setCategory(categoryChips[index].identifier));
    if (isTVShow) dispatch(tvShowsActions.setCategory(categoryChips[index].identifier));
  };

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
    <>
      <ItemCategory isList />
      <SwipeableViews enableMouseEvents index={categoryIndex} onChangeIndex={handleSwipe}>
        {Object.keys(contentList).map((cat) => (
          <div>
            <Grid container justify="center">
              {contentList[cat].slice(0, 10).map((content, rank) => (
                <ItemCard
                  col={12}
                  content={content}
                  drawerOpen
                  mobile
                  rank={rank + 1}
                  type={activeTab}
                />
              ))}
            </Grid>
          </div>
        ))}
      </SwipeableViews>
    </>
  );
};

export default ItemList;
