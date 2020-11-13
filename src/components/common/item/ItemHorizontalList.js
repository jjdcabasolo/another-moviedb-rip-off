import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import ItemCard from './ItemCard';
import ItemHorizontalContainer from './ItemHorizontalContainer';

const useStyles = makeStyles((theme) => ({
  itemHorizontalListContainer: {
    position: 'relative',
  },
  horizontalScrollItemSpacing: {
    marginRight: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ItemHorizontalList = ({ anchorId, overview, items }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmallTabletBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);

  const [showMore, setShowMore] = useState(false);

  const handleButtonClick = () => {
    if (!showMore) {
      const anchor = document.querySelector(`#${anchorId}`);
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    }

    setShowMore(!showMore);
  };

  if (!items) return null;

  return (
    <Grid item container spacing={2}>
      {overview.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="body1">
            {overview}
          </Typography>
        </Grid>
      )}
      { showMore
        ? (
          <Grid item xs={12} container spacing={2}>
            {items.map((item, index) => (
              <ItemCard
                col={isSmallTabletBelow ? 12 : 6}
                content={item}
                isHorizontalScroll
                rank={index + 1}
                type={activeTab}
              />
            ))}
          </Grid>
        )
        : (
          <Grid
            className={classes.itemHorizontalListContainer}
            container
            item
            xs={12}
          >
            <ItemHorizontalContainer
              imageSize={theme.spacing(23)}
              scrollAmount={theme.spacing(45)}
            >
              {items.map((item, index) => (
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
        )}
      <Grid
        className={classes.button}
        container
        item
        justify="flex-end"
        xs={12}
      >
        <Button
          onClick={handleButtonClick}
          variant="outlined"
          size={isMobile ? 'small' : 'medium'}
        >
          {showMore ? 'Show less' : 'Show all'}
        </Button>
      </Grid>
    </Grid>
  );
};

ItemHorizontalList.propTypes = {
  anchorId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  overview: PropTypes.string.isRequired,
};

export default ItemHorizontalList;
