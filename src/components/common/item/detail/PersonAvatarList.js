import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Typography from "../../../custom/base/Typography";

import BrokenImage from "../../BrokenImage";

import { TMDB_IMAGE_PREFIX } from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.colorScheme.background,
  },
  secondary: {
    fontWeight: 200,
  },
  brokenImage: {
    color: theme.palette.action.disabled,
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    "& img": {
      filter: "brightness(70%)",
    },
  },
  listItem: {
    "&:last-child": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const PersonAvatarList = ({ col = 12, content, title }) => {
  const classes = useStyles();

  return (
    <Grid item xs={col}>
      {title && (
        <Typography variant="body1" color="textSecondary">
          {title}
        </Typography>
      )}
      <List disablePadding>
        {content.map((person) => {
          const { job, name, profile_path: profilePath } = person;
          const isImageValid = profilePath !== null;

          return (
            <ListItem
              key={`person-avatar-list-${name}`}
              className={classes.listItem}
            >
              <ListItemAvatar>
                {isImageValid ? (
                  <Avatar
                    alt={`${name}'s avatar.`}
                    className={classes.avatar}
                    src={`${TMDB_IMAGE_PREFIX}/w154${profilePath}`}
                  />
                ) : (
                  <BrokenImage type="avatar" avatarSize="small" />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="body2">{name}</Typography>}
                secondary={
                  <Typography variant="body2" className={classes.secondary}>
                    {job}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

PersonAvatarList.defaultProps = {
  col: 12,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      profile_path: "",
    })
  ),
};

PersonAvatarList.propTypes = {
  col: PropTypes.number,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      job: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
};

export default PersonAvatarList;
