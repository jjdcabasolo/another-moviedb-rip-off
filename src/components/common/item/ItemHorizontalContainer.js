import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Fab, Zoom, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  horizontalScroll: {
    position: 'relative',
    display: 'flex',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  horizontalScrollItem: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(0, 0.125),
    },
  },
  seeMoreItem: {
    cursor: 'pointer',
  },
  scroller: {
    position: 'absolute',
    top: theme.spacing(7),
  },
  rightScroller: {
    right: theme.spacing(2),
  },
  leftScroller: {
    left: theme.spacing(2),
  },
}));

const ItemHorizontalContainer = ({
  children,
  id,
  isWithSeeMore = false,
  handleSeeMore,
  scrollAmount,
  seeMoreComponent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const [hideScrollLeft, setHideScrollLeft] = useState(true);
  const [hideScrollRight, setHideScrollRight] = useState(true);

  const updateScrollers = useCallback(() => {
    const {
      clientWidth,
      scrollLeft,
      scrollWidth,
    } = document.getElementById(`${id}-scroller`);

    setHideScrollLeft(scrollLeft !== 0);
    setHideScrollRight(scrollLeft !== (scrollWidth - clientWidth));
  }, [id]);

  useEffect(() => updateScrollers(), [updateScrollers]);

  const handleScroll = (offset) => {
    const container = document.getElementById(`${id}-scroller`);
    const left = container.scrollLeft + offset;

    container.scrollTo({ left, behavior: 'smooth' });
    updateScrollers();
  };

  return (
    <>
      <div className={classes.horizontalScroll} id={`${id}-scroller`} onScroll={updateScrollers}>
        {children}
        {isWithSeeMore && (
          <div
            className={clsx(
              classes.horizontalScrollItem,
              classes.seeMoreItem,
            )}
            onClick={handleSeeMore}
            onKeyDown={handleSeeMore}
            role="button"
            tabIndex={0}
          >
            {seeMoreComponent}
          </div>
        )}
      </div>
      {!isMobile && (
        <>
          <Zoom in={hideScrollLeft}>
            <Fab
              aria-label="scroll to left"
              className={clsx(classes.scroller, classes.leftScroller)}
              onClick={() => handleScroll(-scrollAmount)}
              size="small"
            >
              <KeyboardArrowLeft />
            </Fab>
          </Zoom>
          <Zoom in={hideScrollRight}>
            <Fab
              aria-label="scroll to right"
              className={clsx(classes.scroller, classes.rightScroller)}
              onClick={() => handleScroll(scrollAmount)}
              size="small"
            >
              <KeyboardArrowRight />
            </Fab>
          </Zoom>
        </>
      )}
    </>
  );
};

ItemHorizontalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isWithSeeMore: PropTypes.bool.isRequired,
  handleSeeMore: PropTypes.func.isRequired,
  scrollAmount: PropTypes.number.isRequired,
  seeMoreComponent: PropTypes.node.isRequired,
};

export default ItemHorizontalContainer;
