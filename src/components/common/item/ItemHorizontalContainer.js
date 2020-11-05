import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Fab, Zoom, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

import PersonAvatar from './detail/PersonAvatar';

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
  avatarCharacter,
  avatarImage,
  avatarName,
  id,
  items,
  handleSeeMore,
  maxCount,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const [hideScrollLeft, setHideScrollLeft] = useState(true);
  const [hideScrollRight, setHideScrollRight] = useState(true);

  const updateScrollers = () => {
    const {
      clientWidth,
      scrollLeft,
      scrollWidth,
    } = document.getElementById(`${id}-scroller`);

    setHideScrollLeft(scrollLeft !== 0);
    setHideScrollRight(scrollLeft !== (scrollWidth - clientWidth));
  };

  useEffect(() => {
    updateScrollers();
  }, []);

  const handleScroll = (offset) => {
    const container = document.getElementById(`${id}-scroller`);
    const left = container.scrollLeft + offset;

    container.scrollTo({ left, behavior: 'smooth' });
    updateScrollers();
  };

  return (
    <>
      <div className={classes.horizontalScroll} id={`${id}-scroller`} onScroll={updateScrollers}>
        {items.slice(0, maxCount).map((item) => (
          <div className={classes.horizontalScrollItem}>
            <PersonAvatar
              character={item[avatarCharacter]}
              col={12}
              image={item[avatarImage]}
              name={item[avatarName]}
              horizontalScroll
            />
          </div>
        ))}
        <div
          className={clsx(
            classes.horizontalScrollItem,
            classes.seeMoreItem,
          )}
          onClick={handleSeeMore}
        >
          <PersonAvatar
            character={`...and ${items.length - maxCount} more`}
            col={12}
            image="seemore"
            name="Click to view"
            horizontalScroll
          />
        </div>
      </div>
      {!isMobile && (
        <>
          <Zoom in={hideScrollLeft}>
            <Fab
              aria-label="scroll to left"
              className={clsx(classes.scroller, classes.leftScroller)}
              onClick={() => handleScroll(-144)}
              size="small"
            >
              <KeyboardArrowLeft />
            </Fab>
          </Zoom>
          <Zoom in={hideScrollRight}>
            <Fab
              aria-label="scroll to right"
              className={clsx(classes.scroller, classes.rightScroller)}
              onClick={() => handleScroll(144)}
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
  avatarCharacter: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired,
  avatarName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  maxCount: PropTypes.number.isRequired,
  handleSeeMore: PropTypes.func.isRequired,
};

export default ItemHorizontalContainer;
