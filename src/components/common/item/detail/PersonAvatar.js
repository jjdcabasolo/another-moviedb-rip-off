import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { BrokenImage, MoreHoriz } from '@material-ui/icons';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontWeight: '400',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  text: {
    marginTop: theme.spacing(1),
  },
  horizontalScrollItemWidth: {
    width: theme.spacing(16),
  },
}));

const PersonAvatar = ({
  character,
  col,
  image,
  name,
  isHorizontalScroll = false,
}) => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={clsx(
        { [classes.horizontalScrollItemWidth]: isHorizontalScroll },
      )}
      container
      direction="column"
      item
      wrap="nowrap"
      xs={col}
    >
      <Grid item>
        <Avatar
          src={image !== null ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w780${image}` : ''}
          className={classes.avatar}
        >
          {image === null && <BrokenImage fontSize="large" />}
          {image === 'seemore' && <MoreHoriz fontSize="large" />}
        </Avatar>
      </Grid>
      <Grid item className={classes.text}>
        <Typography variant="body1" className={classes.title} align="center">
          {character}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.subtitle} align="center" color="textSecondary">
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
};

PersonAvatar.propTypes = {
  character: PropTypes.string.isRequired,
  col: PropTypes.number.isRequired,
  isHorizontalScroll: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PersonAvatar;
