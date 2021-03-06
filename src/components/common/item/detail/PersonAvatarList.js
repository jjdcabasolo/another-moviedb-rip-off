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

import BrokenImage from '../../BrokenImage';

import { TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: theme.typography.h6.fontWeight,
  },
  brokenImage: {
    color: theme.palette.action.disabled,
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
  },
  listItem: {
    '&:last-child': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const PersonAvatarList = ({
  col = 12,
  content,
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
        {content.map((person) => {
          const {
            job,
            name,
            profile_path: profilePath,
          } = person;
          const isImageValid = profilePath !== null;

          return (
            <ListItem key={`person-avatar-list-${name}`} className={classes.listItem}>
              <ListItemAvatar>
                {isImageValid
                  ? (
                    <Avatar
                      alt={`${name}'s avatar.`}
                      className={classes.avatar}
                      src={`${TMDB_IMAGE_PREFIX}/w154${profilePath}`}
                    />
                  )
                  : <BrokenImage type="avatar" avatarSize="small" />}
              </ListItemAvatar>
              <ListItemText primary={name} secondary={job} />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

PersonAvatarList.defaultProps = {
  col: 12,
  content: PropTypes.arrayOf(PropTypes.shape({
    profile_path: '',
  })),
};

PersonAvatarList.propTypes = {
  col: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.shape({
    job: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
  })),
  title: PropTypes.string.isRequired,
};

export default PersonAvatarList;
