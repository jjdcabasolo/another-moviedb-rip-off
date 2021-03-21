import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import { Chip, Divider, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    whiteSpace: 'pre-wrap',
    marginTop: theme.spacing(2),
  },
  reviewContainer: {
    paddingBottom: theme.spacing(4),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
  author: {
    fontWeight: 600,
  },
  divider: {
    paddingBottom: theme.spacing(4),
  },
}));

const ItemReview = ({
  author,
  content,
  date,
  divider,
  rating,
}) => {
  const classes = useStyles();

  const renderChip = () => {
    let label;

    if (rating === 10) label = '`Perfect`!';
    else if (8 <= rating && rating < 10) label = 'Good';
    else if (5 <= rating && rating < 8) label = 'Fair';
    else label = 'Nope';

    return (
      <Chip
        className={classes.chip}
        label={label}
        size="small"
      />
    )
  };

  return (
    <>
      {divider
        ? (
          <Grid item xs={12} className={classes.divider}>
            <Divider />
          </Grid>
        )
        : null}
      <Grid container className={classes.reviewContainer} spacing={2}>
        <Grid item md={2} xs={12}>
          <Typography variant="h3">
            {rating}
          </Typography>
          <Typography color="textSecondary">
            out of 10
          </Typography>
          {renderChip()}
        </Grid>
        <Grid item md={10} xs={12}>
          <Typography>
            Review by <span className={classes.author}>{author}</span>
          </Typography>
          <Typography variant="caption" gutterBottom color="textSecondary">
            {`Created on ${moment(date).format('MMM D, YYYY')}`}
          </Typography>
          <Typography variant="body2" gutterBottom className={classes.content}>
            {content}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

ItemReview.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  divider: PropTypes.bool.isRequired,
  rating: PropTypes.string.isRequired,
};

export default ItemReview;
