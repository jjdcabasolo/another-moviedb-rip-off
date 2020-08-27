import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
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
            job,
            logo_path: logoPath,
            name,
            profile_path: profilePath,
          } = person;
          const doesPathExist = location === 'network' ? logoPath !== null : profilePath !== null;
          const image = location === 'network' ? logoPath : profilePath;

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

PersonAvatarList.propTypes = {
  col: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PersonAvatarList;
