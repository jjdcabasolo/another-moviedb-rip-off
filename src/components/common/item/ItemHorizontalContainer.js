import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Zoom, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

import Fab from '../../overrides/Fab';

const useStyles = makeStyles((theme) => ({
  horizontalScroll: {
    position: 'relative',
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(0, -2),
      padding: theme.spacing(0, 2),
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
    [theme.breakpoints.only('xs')]: {
      paddingRight: theme.spacing(2),
    },
  },
  scroller: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: 'absolute',
    top: theme.spacing(7),
  },
  rightScroller: {
    right: -theme.spacing(2.5),
  },
  leftScroller: {
    left: -theme.spacing(2.5),
  },
}));

const ItemHorizontalContainer = ({
  children,
  handleSeeMore,
  imageSize,
  isWithSeeMore = false,
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
      setHideScrollRight(Math.floor(scrollLeft) !== (scrollWidth - clientWidth));
    }
  }, []);

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
              onClick={() => handleScroll(-scrollAmount)}
              size="small"
              style={{ top: scrollerTopHeight }}
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
              style={{ top: scrollerTopHeight }}
            >
              <KeyboardArrowRight />
            </Fab>
          </Zoom>
        </>
      )}
    </>
  );
};

ItemHorizontalContainer.defaultProps = {
  handleSeeMore: () => {},
  imageSize: 0,
  isWithSeeMore: false,
  seeMoreComponent: null,
};

ItemHorizontalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  handleSeeMore: PropTypes.func,
  imageSize: PropTypes.number,
  isWithSeeMore: PropTypes.bool,
  scrollAmount: PropTypes.number.isRequired,
  seeMoreComponent: PropTypes.node,
};

export default ItemHorizontalContainer;
