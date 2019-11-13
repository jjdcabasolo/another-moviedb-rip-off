import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { BrokenImage } from '@material-ui/icons';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

const CrewAvatarList = ({ title, content }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <List disablePadding>
        { content.map(crew => {
          const doesPathExist = crew.profile_path !== null;
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt={doesPathExist ? `Image not loading? Visit ${crew.profile_path} to view.` : `${crew.name}'s avatar.`}
                  src={doesPathExist ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w154${crew.profile_path}` : ''}
                >
                  {!doesPathExist && <BrokenImage />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={crew.name} secondary={crew.job} />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default CrewAvatarList;
