import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  useMediaQuery,
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
  avatar: {
    height: theme.spacing(7.5),
    width: theme.spacing(7.5),
  },
  itemText: {
    paddingLeft: theme.spacing(2),
  },
}));

const CrewAvatarList = ({ title, content }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
                  src={doesPathExist ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w300${crew.profile_path}` : ''}
                  className={classes.avatar}
                >
                  {!doesPathExist && <BrokenImage fontSize="large" />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={crew.name} secondary={crew.job} className={classes.itemText}/>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default CrewAvatarList;
