import React from 'react';
import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import ItemCard from './ItemCard';
import ItemHorizontalContainer from './ItemHorizontalContainer';
import ItemLazyLoad from './ItemLazyLoad';
import ItemSeeMore from './ItemSeeMore';
import TruncatedOverview from '../TruncatedOverview';

import { scrollToID } from '../../../utils/functions';

import {
  MAX_WORD_COUNT,
  MAX_ITEMS_BEFORE_COLLAPSING,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(2, 0),
    },
    position: 'relative',
    width: 'inherit',
  },
  horizontalScrollItemSpacing: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
  overview: {
    marginBottom: theme.spacing(1),
  },
}));

const ItemCardHorizontalList = ({
  anchorId,
  appbarTitle,
  areRecommendations = false,
  items,
  overview,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);

  const { section } = useParams();

  const sectionId = anchorId.replace('movie-', '').replace('tvshow-', '');
  const collapsedItems = areRecommendations ? items.slice(0, 10) : items;
  const hasSpacingHorizontalScroll = section === sectionId;

  if (!items) return null;

  const renderOverview = () => overview.length > 0 && (
    <div className={classes.overview}>
      <TruncatedOverview overview={overview} maxWords={MAX_WORD_COUNT} />
    </div>
  );

  return (
    <Grid container className={classes.container}>
      {renderOverview()}
      <ItemSeeMore
        appbarTitle={appbarTitle}
        collapsedClickEvent={() => scrollToID(anchorId)}
        collapsedContent={(
          <ItemHorizontalContainer scrollAmount={theme.spacing(45 + 2)}>
            {collapsedItems.map((item, index) => (
              <div
                className={classes.horizontalScrollItemSpacing}
                key={`item-card-horizontal-list-${item.id}`}
              >
                <Grid container>
                  <ItemCard
                    col={12}
                    content={item}
                    hasSpacingHorizontalScroll={hasSpacingHorizontalScroll}
                    isHorizontalScroll
                    rank={index + 1}
                    type={activeTab}
                  />
                </Grid>
              </div>
            ))}
          </ItemHorizontalContainer>
        )}
        isButtonShown={items.length > MAX_ITEMS_BEFORE_COLLAPSING}
        expandedContent={(
          <>
            {isMobile && renderOverview()}
            <Grid item xs={12} container>
              <ItemLazyLoad
                contents={items}
                node={<ItemCard />}
                otherProps={{
                  col: 12,
                  hasSpacingHorizontalScroll,
                  isHorizontalScroll: true,
                  type: activeTab,
                }}
                type="itemCardHorizontalList"
              />
            </Grid>
          </>
        )}
        maxWidth="xs"
        sectionId={sectionId}
      />
    </Grid>
  );
};

ItemCardHorizontalList.defaultProps = {
  areRecommendations: false,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: '',
    link: '',
  })),
};

ItemCardHorizontalList.propTypes = {
  anchorId: PropTypes.string.isRequired,
  appbarTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  areRecommendations: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  })),
  overview: PropTypes.string.isRequired,
};

export default ItemCardHorizontalList;
