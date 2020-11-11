import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
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
    right: theme.spacing(3),
  },
  leftScroller: {
    left: theme.spacing(3),
  },
}));

const ItemHorizontalContainer = ({
  children,
  imageSize,
  isWithSeeMore = false,
  handleSeeMore,
  scrollAmount,
  seeMoreComponent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const scroller = useRef(null);

  const [hideScrollLeft, setHideScrollLeft] = useState(true);
  const [hideScrollRight, setHideScrollRight] = useState(true);

  const midScrollerContainerTopHeight = scroller.current
    ? (scroller.current.clientHeight / 2) - theme.spacing(2.5)
    : 0;
  const scrollerTopHeight = imageSize
    ? (imageSize / 2) - theme.spacing(2.5)
    : midScrollerContainerTopHeight;

  const updateScrollers = useCallback(() => {
    const { current } = scroller;
    if (current) {
      const { clientWidth, scrollLeft, scrollWidth } = current;

      setHideScrollLeft(scrollLeft !== 0);
      setHideScrollRight(scrollLeft !== (scrollWidth - clientWidth));
    }
  }, [children]);

  useEffect(() => {
    setTimeout(() => updateScrollers(), 100);
  }, [updateScrollers, children]);

  const handleScroll = (offset) => {
    const { current: container } = scroller;
    const { scrollLeft } = container;
    const left = scrollLeft + offset;

    container.scrollTo({ left, behavior: 'smooth' });
    updateScrollers();
  };

  return (
    <>
      <div className={classes.horizontalScroll} onScroll={updateScrollers} ref={scroller}>
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
              style={{ top: scrollerTopHeight }}
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
              style={{ top: scrollerTopHeight }}
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
  isWithSeeMore: PropTypes.bool.isRequired,
  handleSeeMore: PropTypes.func.isRequired,
  imageSize: PropTypes.number.isRequired,
  scrollAmount: PropTypes.number.isRequired,
  seeMoreComponent: PropTypes.node.isRequired,
};

export default ItemHorizontalContainer;
