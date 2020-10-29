import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';

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
  scroller: {
    position: 'absolute',
    top: theme.spacing(5),
  },
  rightScroller: {
    right: 0,
  },
}));

const ItemHorizontalContainer = ({
  avatarCharacter,
  avatarImage,
  avatarName,
  id,
  items,
  maxCount,
}) => {
  const classes = useStyles();

  const handleScroll = (offset) => {
    const container = document.querySelector(`#${id}-scroller`);

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={classes.horizontalScroll} id={`${id}-scroller`}>
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
        <div className={classes.horizontalScrollItem}>
          <PersonAvatar
            character={`...and ${items.length - maxCount} more`}
            col={12}
            image="seemore"
            name="Click see all to view"
            horizontalScroll
          />
        </div>
      </div>
      <Fab
        aria-label="scroll to right"
        className={clsx(classes.scroller, classes.rightScroller)}
        onClick={() => handleScroll(144)}
      >
        <KeyboardArrowRight />
      </Fab>
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
};

export default ItemHorizontalContainer;
