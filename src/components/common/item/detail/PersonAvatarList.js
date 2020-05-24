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

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

const PersonAvatarList = ({
  col = 12,
  content,
  location,
  title,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={col}>
      {title && (
        <Typography variant="body1" className={classes.title}>
          {title}
        </Typography>
      )}
      <List disablePadding>
        { content.map((person) => {
          const {
            profile_path, name, job, logo_path,
          } = person;
          const doesPathExist = location === 'network' ? logo_path !== null : profile_path !== null;
          const image = location === 'network' ? logo_path : profile_path;

          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt={doesPathExist ? `Image not loading? Visit ${image} to view.` : `${name}'s avatar.`}
                  src={doesPathExist ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w154${image}` : ''}
                >
                  {!doesPathExist && <BrokenImage />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={job} />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default PersonAvatarList;
