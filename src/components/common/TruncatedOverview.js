import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { truncateText } from '../../utils/functions';

const useStyles = makeStyles(() => ({
  readMore: {
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
    <Typography variant={variant} gutterBottom ref={overviewRef}>
      {isOverviewTruncated
        ? (
          <>
            {showMoreOverview ? overview : overviewTruncated}
            <Typography
              className={classes.readMore}
              color="textSecondary"
              display="inline"
              onClick={handleReadMore}
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

TruncatedOverview.propTypes = {
  maxWords: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default TruncatedOverview;
