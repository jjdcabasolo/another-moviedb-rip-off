import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import ItemCard from './ItemCard';

import { sidebarActions } from '../../../reducers/ducks';

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 0),
  },
}));

const ItemSearchResults = ({
  type,
}) => {
  const theme = useTheme();
  const isBigTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const movieSearchResults = useSelector((state) => state.movies.searchResults);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const tvShowSearchResults = useSelector((state) => state.tvShows.searchResults);
  const dispatch = useDispatch();

  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(activeTab === 'movies' ? movieSearchResults : tvShowSearchResults);
  }, [activeTab, movieSearchResults, tvShowSearchResults]);

  const handleDrawerToggle = () => {
    dispatch(sidebarActions.setItemDrawer(false));
  };

  let contentUI;

  if (content.length > 0) {
    switch (type) {
      case 'mobile':
        break;
      default: {
        let itemCardCol = 12; // 1 card per row
        if (isBigTablet) itemCardCol = 4; // 3 cards per row
        if (isSmallTablet) itemCardCol = 6; // 2 cards per row
        if (isDesktop) itemCardCol = 2; // 5 cards per row
        if (!itemDrawerOpen) itemCardCol = 12; // 1 card per row

        contentUI = (
          <Grid
            className={classes.cardGridContainer}
            container
            item
            justify="center"
          >
            {content.slice(0, 10).map((item, rank) => (
              <ItemCard
                col={itemCardCol}
                content={item}
                drawerOpen={itemDrawerOpen}
                handleDrawerToggle={handleDrawerToggle}
                key={`item-search-results-item-card-${rank + 1}-${item.id}`}
                rank={rank + 1}
                type={activeTab}
              />
            ))}
          </Grid>
        );
      }
    }
  } else {
    contentUI = (
      <div className={classes.resultContainer}>
        <Typography>No resuls found.</Typography>
      </div>
    );
  }

  return (
    <Container>
      <div className={classes.resultContainer}>
        <Typography gutterBottom color="textSecondary">Showing results for</Typography>
        <Typography variant="h2">{searchQuery}</Typography>
      </div>
      {contentUI}
    </Container>
  );
};

ItemSearchResults.defaultProps = {
  type: '',
};

ItemSearchResults.propTypes = {
  type: PropTypes.string,
};

export default ItemSearchResults;
