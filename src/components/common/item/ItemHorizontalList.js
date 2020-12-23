import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  useMediaQuery,
} from '@material-ui/core';

import ItemCard from './ItemCard';
import ItemHorizontalContainer from './ItemHorizontalContainer';
import TruncatedOverview from '../TruncatedOverview';

import { scrollToID } from '../../../utils/functions';

const MAX_WORD_COUNT = 20;
const MAX_ITEMS_BEFORE_COLLAPSING = 3;

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
  readMore: {
    cursor: 'pointer',
  },
}));

const ItemHorizontalList = ({
  anchorId,
  items,
  overview,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmallTabletBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);

  const [showMoreItems, setShowMoreItems] = useState(false);

  const handleButtonClick = () => {
    if (!showMoreItems) scrollToID(anchorId);
    setShowMoreItems(!showMoreItems);
  };

  if (!items) return null;

  return (
    <Grid item container spacing={2}>
      {overview.length > 0 && (
        <Grid item xs={12}>
          <TruncatedOverview overview={overview} maxWords={MAX_WORD_COUNT} />
        </Grid>
      )}
      {showMoreItems
        ? (
          <Grid item xs={12} container>
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
              isHorizontalList
              imageSize={theme.spacing(23)}
              scrollAmount={theme.spacing(45 + 2)}
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
      {items.length > MAX_ITEMS_BEFORE_COLLAPSING && (
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
            {showMoreItems ? 'Show less' : 'Show all'}
          </Button>
        </Grid>
      )}
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
