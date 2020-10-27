import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
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

  return (
    visible
      ? (
        <>
          <Grid item xs={col} id={anchorId} container spacing={2}>
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
                  item
                  xs={isCollapsible ? 11 : 12}
                >
                  <Typography variant="h5">
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
                    <IconButton onClick={handleSectionToggle} className={classes.margin}>
                      {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            )}
            <Grid item xs={12} container>
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
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )
            : null}
        </>
      )
      : null
  );
};

Section.propTypes = {
  anchorId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  chipContent: PropTypes.string.isRequired,
  col: PropTypes.number.isRequired,
  divider: PropTypes.bool.isRequired,
  isCollapsible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Section;
