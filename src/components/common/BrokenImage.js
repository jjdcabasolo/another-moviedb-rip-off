import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import BackgroundPlaceholderIcon from "../../assets/icons/bg-placeholder";
import AvatarPlaceholderIcon from "../../assets/icons/avatar-placeholder";

const useStyles = makeStyles((theme) => ({
  bgPlaceholder: {
    "& svg": {
      height: theme.spacing(20),
      width: theme.spacing(8),
    },
  },
  avatarPlaceholder: {
    "& svg": {
      height: theme.spacing(5),
    },
  },
  brokenImageContainer: {
    backgroundColor: theme.palette.brokenImage.background,
    border: `1px solid ${theme.palette.brokenImage.border}`,
  },
  brokenImageBG: {
    backgroundColor: theme.palette.brokenImage.background,
  },
}));

const BrokenImage = ({ avatarSize = "large", extraClass, type }) => {
  const classes = useStyles();

  switch (type) {
    case "baseImage":
      return (
        <div
          className={clsx(
            extraClass,
            classes.bgPlaceholder,
            classes.brokenImageContainer
          )}
        >
          <BackgroundPlaceholderIcon />
        </div>
      );
    case "cardMedia":
      return (
        <div
          className={clsx(
            extraClass,
            classes.bgPlaceholder,
            classes.brokenImageBG
          )}
        >
          <BackgroundPlaceholderIcon />
        </div>
      );
    case "avatar":
      return (
        <Avatar
          className={clsx(
            extraClass,
            classes.avatarPlaceholder,
            classes.brokenImageContainer
          )}
        >
          <AvatarPlaceholderIcon />
        </Avatar>
      );
    default:
      return <BackgroundPlaceholderIcon />;
  }
};

BrokenImage.defaultProps = {
  extraClass: "",
};

BrokenImage.propTypes = {
  type: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export default BrokenImage;
