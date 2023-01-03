import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import LinesEllipsis from "react-lines-ellipsis";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  overview: {
    userSelect: "none",
    whiteSpace: "pre-wrap",
  },
  readMore: {
    cursor: "pointer",
  },
  textEllipsis: {
    whiteSpace: "pre-wrap",
  },
}));

const TruncatedOverview = ({ maxLine, overview, variant = "body1" }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const overviewRef = useRef(null);

  const [showMoreOverview, setShowMoreOverview] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const maxLineDefault = isMobile ? 3 : 2;

  const handleReadMore = () => {
    if (!isTruncated) return;
    setShowMoreOverview(!showMoreOverview);
  };

  const handleReflow = ({ clamped }) => {
    setIsTruncated(clamped);
  };

  return (
    <Typography
      className={classes.overview}
      component="div"
      gutterBottom
      onClick={handleReadMore}
      ref={overviewRef}
      variant={variant}
    >
      {showMoreOverview ? (
        overview
      ) : (
        <LinesEllipsis
          basedOn="letters"
          className={classes.textEllipsis}
          ellipsis={
            <Typography
              component="span"
              color="textSecondary"
              display="inline"
              variant={variant}
              className={classes.readMore}
            >
              ...read more.
            </Typography>
          }
          maxLine={maxLine || maxLineDefault}
          onReflow={handleReflow}
          text={overview.replace(/\n/g, " ")}
          trimRight
        />
      )}
    </Typography>
  );
};

TruncatedOverview.defaultProps = {
  maxLine: null,
  variant: "body1",
};

TruncatedOverview.propTypes = {
  maxLine: PropTypes.number,
  overview: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

export default TruncatedOverview;
