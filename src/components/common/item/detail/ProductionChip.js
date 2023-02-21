import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import Chip from "../../../custom/base/Chip";

import BrokenImage from "../../BrokenImage";

import { truncateText } from "../../../../utils/functions";

import {
  MAX_CHARACTER_PRODUCTION_CHIP,
  TMDB_IMAGE_PREFIX,
} from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    "& img": {
      filter: "brightness(70%)",
    },
  },
  brokenImage: {
    height: theme.spacing(3),
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(3),
    marginRight: -6,
  },
}));

const ProductionChip = ({ country, image, name }) => {
  const classes = useStyles();

  let label = truncateText(name, MAX_CHARACTER_PRODUCTION_CHIP, "characters");
  if (country) label += ` (${country})`;

  const avatarImage =
    image !== null ? (
      <Avatar
        alt={`${name}'s avatar.`}
        className={classes.avatar}
        src={`${TMDB_IMAGE_PREFIX}/w154${image}`}
      />
    ) : (
      <BrokenImage
        avatarSize="small"
        extraClass={classes.brokenImage}
        type="avatar"
      />
    );

  return (
    <Chip
      avatar={avatarImage}
      variant="outlined"
      label={label}
      className={classes.chip}
    />
  );
};

ProductionChip.defaultProps = {
  country: "",
  image: "",
};

ProductionChip.propTypes = {
  country: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default ProductionChip;
