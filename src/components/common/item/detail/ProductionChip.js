import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core';
import { BrokenImage } from '@material-ui/icons';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  avatar: {
    width: theme.spacing(10),
  },
}));

const ProductionChip = ({
  country,
  image,
  name,
}) => {
  const classes = useStyles();

  const doesPathExist = image !== null;

  let label = name;
  if (country) label += ` (${country})`;

  return (
    <Chip
      avatar={(
        <Avatar
          alt={doesPathExist ? `Image not loading? Visit ${image} to view.` : `${name}'s avatar.`}
          src={doesPathExist ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w154${image}` : ''}
        >
          {!doesPathExist && <BrokenImage fontSize="small" />}
        </Avatar>
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
