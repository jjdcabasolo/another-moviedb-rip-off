import React from "react";
import PropTypes from "prop-types";
import { SvgIcon, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BaseIconButton from "../base/IconButton";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  activeSvgIcon: {
    "& svg *[fill]": {
      fill: theme.palette.colorScheme.reverse.svgStrokeFill,
    },
    "& svg *[stroke]": {
      stroke: theme.palette.colorScheme.reverse.svgStrokeFill,
    },
  },
  svgIcon: {
    "& svg *[fill]": {
      fill: theme.palette.colorScheme.svgStrokeFill,
    },
    "& svg *[stroke]": {
      stroke: theme.palette.colorScheme.svgStrokeFill,
    },
  },
}));

const IconButton = ({ isActive, svgSrc, tooltipTitle, handleOnClick }) => {
  const classes = useStyles();

  const svgIcon = (
    <BaseIconButton
      className={clsx({ [classes.active]: isActive })}
      onClick={handleOnClick}
    >
      <SvgIcon
        className={clsx({
          [classes.activeSvgIcon]: isActive,
          [classes.svgIcon]: !isActive,
        })}
      >
        {svgSrc}
      </SvgIcon>
    </BaseIconButton>
  );

  if (tooltipTitle.length > 0) {
    return <Tooltip title={tooltipTitle}>{svgIcon}</Tooltip>;
  }

  return svgIcon;
};

IconButton.defaultProps = {
  isActive: false,
  handleOnClick: () => {},
  svgSrc: "",
  tooltipTitle: "",
};

IconButton.propTypes = {
  isActive: PropTypes.bool,
  handleOnClick: PropTypes.func,
  svgSrc: PropTypes.string,
  tooltipTitle: PropTypes.string,
};

export default IconButton;
