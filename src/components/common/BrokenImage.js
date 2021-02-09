import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import {
  BrokenImageTwoTone as BrokenImageIcon,
  PersonTwoTone,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  brokenImage: {
    color: theme.palette.action.disabled,
  },
  brokenImageContainer: {
    backgroundColor: theme.palette.brokenImage.background,
    border: `1px solid ${theme.palette.brokenImage.border}`,
  },
  brokenImageBG: {
    backgroundColor: theme.palette.brokenImage.background,
  },
}));

const BrokenImage = ({
  avatarSize = 'large',
  extraClass,
  type,
}) => {
  const classes = useStyles();

  switch (type) {
    case 'baseImage':
      return (
        <div className={clsx(extraClass, classes.brokenImageContainer)}>
          <BrokenImageIcon fontSize={avatarSize} className={classes.brokenImage} />
        </div>
      );
    case 'cardMedia':
      return (
        <div className={clsx(extraClass, classes.brokenImageBG)}>
          <BrokenImageIcon fontSize={avatarSize} className={classes.brokenImage} />
        </div>
      );
    case 'avatar':
      return (
        <Avatar className={clsx(extraClass, classes.brokenImageContainer)}>
          <PersonTwoTone fontSize={avatarSize} className={classes.brokenImage} />
        </Avatar>
      );
    default:
      return <BrokenImageIcon fontSize={avatarSize} className={classes.brokenImage} />;
  }
};

BrokenImage.propTypes = {
  avatarSize: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  extraClass: PropTypes.string.isRequired,
};

export default BrokenImage;
