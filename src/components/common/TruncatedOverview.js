import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { truncateText } from '../../utils/functions';

const useStyles = makeStyles(() => ({
  readMore: {
    cursor: 'pointer',
  },
}));

const TruncatedOverview = ({ overview, maxWords }) => {
  const classes = useStyles();

  const [showMoreOverview, setShowMoreOverview] = useState(false);

  const [overviewTruncated, isOverviewTruncated] = truncateText(overview, maxWords, 'words');

  const handleReadMore = () => {
    if (!isOverviewTruncated) return;
    setShowMoreOverview(!showMoreOverview);
  };

  return (
    <Typography variant="body1" gutterBottom>
      {isOverviewTruncated
        ? (
          <>
            {showMoreOverview ? overview : overviewTruncated }
            <Typography
              className={classes.readMore}
              color="textSecondary"
              onClick={handleReadMore}
              display="inline"
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
};

export default TruncatedOverview;
