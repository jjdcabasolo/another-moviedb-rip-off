import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { truncateText } from '../../utils/functions';

const useStyles = makeStyles(() => ({
  overview: {
    userSelect: 'none',
    cursor: 'pointer',
  },
}));

const TruncatedOverview = ({
  overview,
  maxWords,
  variant = 'body1',
}) => {
  const classes = useStyles();

  const overviewRef = useRef(null);

  const [showMoreOverview, setShowMoreOverview] = useState(false);

  const [overviewTruncated, isOverviewTruncated] = truncateText(overview, maxWords, 'words');

  const handleReadMore = () => {
    if (!isOverviewTruncated) return;
    setShowMoreOverview(!showMoreOverview);
  };

  return (
    <Typography
      className={clsx({ [classes.overview]: isOverviewTruncated })}
      gutterBottom
      onClick={handleReadMore}
      ref={overviewRef}
      variant={variant}
    >
      {isOverviewTruncated
        ? (
          <>
            {showMoreOverview ? overview : overviewTruncated}
            <Typography
              component="span"
              color="textSecondary"
              display="inline"
              variant={variant}
            >
              {showMoreOverview ? ' Read less.' : '... read more.' }
            </Typography>
          </>
        )
        : overview}
    </Typography>
  );
};

TruncatedOverview.defaultProps = {
  variant: 'body1',
};

TruncatedOverview.propTypes = {
  maxWords: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

export default TruncatedOverview;
