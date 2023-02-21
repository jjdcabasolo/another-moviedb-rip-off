import React, { useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Chip, Collapse, Divider, Grid, Tooltip } from "@material-ui/core";
import IconButton from "../../../custom/composed/IconButton";
import Typography from "../../../custom/base/Typography";
import ArrowDownIcon from "../../../../assets/icons/arrow-down";
import ArrowUpIcon from "../../../../assets/icons/arrow-up";

const useStyles = makeStyles((theme) => ({
  titleGrid: {
    flexGrow: 1,
    display: "flex",
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  collapseContainer: {
    width: "100%",
  },
  sectionContainer: {
    transition: theme.transitions.create("margin-top", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sectionContainerSpacing: {
    marginTop: theme.spacing(2),
  },
  dividerContainer: {
    [theme.breakpoints.only("xs")]: {
      padding: `${theme.spacing(2, 0)} !important`,
    },
  },
  outlinedText: {
    backgroundColor: theme.palette.colorScheme.sectionHeaderBackground,
    color: theme.palette.colorScheme.sectionHeaderText,
    padding: theme.spacing(1, 0),
  },
  anchor: {
    [theme.breakpoints.only("xs")]: {
      marginTop: -theme.spacing(6),
    },
  },
}));

const Section = ({
  anchorId,
  children,
  chipContent,
  col = 12,
  divider = true,
  isCollapsible = true,
  title,
  visible = true,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  const handleSectionToggle = () => {
    if (isCollapsible) {
      setExpanded(!expanded);
    }
  };

  return visible ? (
    <>
      <div id={anchorId} className={classes.anchor} />
      <Grid container item xs={col}>
        {title && (
          <Grid container item xs={12}>
            <Grid
              alignItems="center"
              className={classes.titleGrid}
              container
              item
              xs={isCollapsible ? 11 : 12}
            >
              <Typography variant="h6">
                <span className={classes.outlinedText}>{title}</span>
                {chipContent && (
                  <Chip
                    className={classes.chip}
                    label={chipContent}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Typography>
            </Grid>
            {isCollapsible && (
              <Grid item xs={1} container justify="flex-end">
                <Tooltip title={expanded ? "Hide content" : "Show content"}>
                  <IconButton
                    className={classes.margin}
                    svgSrc={expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    handleOnClick={handleSectionToggle}
                    tooltipTitle={expanded ? "Close section" : "Open section"}
                  />
                </Tooltip>
              </Grid>
            )}
          </Grid>
        )}
        <Grid
          item
          xs={12}
          className={clsx(classes.sectionContainer, {
            [classes.sectionContainerSpacing]: expanded && title,
          })}
          container
        >
          {isCollapsible ? (
            <Collapse
              className={classes.collapseContainer}
              in={expanded}
              timeout="auto"
              unmountOnExit
            >
              {children}
            </Collapse>
          ) : (
            children
          )}
        </Grid>
      </Grid>
      {divider ? (
        <Grid item xs={12} className={classes.dividerContainer}>
          <Divider />
        </Grid>
      ) : null}
    </>
  ) : null;
};

Section.defaultProps = {
  chipContent: "",
  col: 12,
  divider: true,
  isCollapsible: true,
  title: "",
  visible: true,
};

Section.propTypes = {
  anchorId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  chipContent: PropTypes.string,
  col: PropTypes.number,
  divider: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool,
};

export default Section;
