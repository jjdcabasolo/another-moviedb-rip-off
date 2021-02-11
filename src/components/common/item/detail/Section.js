import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  titleGrid: {
    flexGrow: 1,
    display: 'flex',
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  collapseContainer: {
    width: '100%',
  },
  sectionHeader: {
    cursor: 'pointer',
  },
  sectionContainer: {
    transition: theme.transitions.create('margin-top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sectionContainerSpacing: {
    marginTop: theme.spacing(2),
  },
  dividerContainer: {
    [theme.breakpoints.only('xs')]: {
      padding: `${theme.spacing(2, 0)} !important`,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);

  const handleSectionToggle = () => {
    if (isCollapsible) {
      setExpanded(!expanded);
    }
  };

  return (
    visible
      ? (
        <>
          <div id={anchorId} />
          <Grid
            container
            item
            xs={col}
          >
            {title && (
              <Grid
                className={classes.sectionHeader}
                container
                item
                onClick={handleSectionToggle}
                xs={12}
              >
                <Grid
                  alignItems="center"
                  className={classes.titleGrid}
                  container
                  item
                  xs={isCollapsible ? 11 : 12}
                >
                  <Typography variant="h6">
                    {title}
                    {chipContent && (
                      <Chip
                        className={classes.chip}
                        color="default"
                        label={chipContent}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Typography>
                </Grid>
                {isCollapsible && (
                  <Grid item xs={1} container justify="flex-end">
                    <Tooltip title={expanded ? 'Hide content' : 'Show content'}>
                      <IconButton
                        className={classes.margin}
                        onClick={handleSectionToggle}
                        size={isMobile ? 'small' : 'medium'}
                      >
                        {expanded ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            )}
            <Grid
              item
              xs={12}
              className={clsx(
                classes.sectionContainer,
                { [classes.sectionContainerSpacing]: expanded && title },
              )}
              container
            >
              {isCollapsible
                ? (
                  <Collapse
                    className={classes.collapseContainer}
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    {children}
                  </Collapse>
                )
                : children}
            </Grid>
          </Grid>
          {divider
            ? (
              <Grid item xs={12} className={classes.dividerContainer}>
                <Divider />
              </Grid>
            )
            : null}
        </>
      )
      : null
  );
};

Section.defaultProps = {
  chipContent: '',
  col: 12,
  divider: true,
  isCollapsible: true,
  title: '',
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
