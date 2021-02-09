import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core';

import BrokenImage from '../../BrokenImage';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
  },
  brokenImage: {
    height: theme.spacing(3),
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(3),
  },
}));

const ProductionChip = ({
  country,
  image,
  name,
}) => {
  const classes = useStyles();

  const isImageValid = image !== null;

  let label = name;
  if (country) label += ` (${country})`;

  return (
    <Chip
      avatar={isImageValid
        ? (
          <Avatar
            alt={`${name}'s avatar.`}
            className={classes.avatar}
            src={`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w154${image}`}
          />
        )
        : (
          <BrokenImage
            avatarSize="small"
            extraClass={classes.brokenImage}
            type="avatar"
          />
        )}
      variant="outlined"
      label={label}
      className={classes.chip}
    />
  );
};

ProductionChip.propTypes = {
  country: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProductionChip;
