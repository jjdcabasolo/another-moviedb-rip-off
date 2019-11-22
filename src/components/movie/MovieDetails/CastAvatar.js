import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { BrokenImage } from '@material-ui/icons';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  subtitle: {
    fontWeight: '400',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  text: {
    marginTop: theme.spacing(1),
  },
}));

const CastAvatar = ({ content, col }) => {
  const classes = useStyles();

  if (!content) return null;

  return (
    <Grid item xs={col} container justify="center" alignItems="center" direction="column" wrap="nowrap">
      <Grid item>
        <Avatar
          src={content.profile_path !== null ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w780${content.profile_path}` : ''}
          className={classes.avatar}
        >
          {content.profile_path === null && <BrokenImage fontSize="large" />}
        </Avatar>
      </Grid>
      <Grid item className={classes.text}>      
        <Typography variant="body1" className={classes.title} align="center">
          {content.character}
        </Typography>
      </Grid>
      <Grid item>      
        <Typography vairant="body2" className={classes.subtitle} align="center" color="textSecondary">
          {content.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CastAvatar;