import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Chip,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import TruncatedOverview from '../TruncatedOverview';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2),
  },
  reviewContainer: {
    paddingBottom: theme.spacing(4),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  author: {
    fontWeight: 600,
  },
  divider: {
    paddingBottom: theme.spacing(4),
  },
  item: {
    [theme.breakpoints.only('xs')]: {
      alignItems: 'center',
      display: 'flex',
    },
  },
  reviewCard: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    height: 'fit-content',
    margin: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  reviewContents: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '80%',
      flexBasis: '80%',
    }
  },
}));

const ItemReview = ({
  author,
  content,
  date,
  divider,
  rating,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const renderChip = () => {
    let label;

    if (rating === 10) label = 'Perfect!';
    else if (8 <= rating && rating < 10) label = 'Good~';
    else if (5 <= rating && rating < 8) label = 'Fair';
    else label = 'Nope.';

    return <Chip label={label} size="small" />;
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
        <Grid item sm={2} xs={12} container direction={isMobile ? 'row' : 'column'} spacing={1} className={classes.reviewCard}>
          <Grid item>
            <Typography variant="h3">
              {rating}
            </Typography>
          </Grid>
          <Grid item className={classes.item}>
            <Typography color="textSecondary">
              out of 10
            </Typography>
          </Grid>
          <Grid item className={classes.item}>
            {renderChip()}
          </Grid>
        </Grid>
        <Grid item sm={10} xs={12} className={classes.reviewContents}>
          <Typography>
            Review by <span className={classes.author}>{author}</span>
          </Typography>
          <Typography variant="caption" gutterBottom color="textSecondary">
            {`Created on ${moment(date).format('MMM D, YYYY')}`}
          </Typography>
          <Typography variant="body2" gutterBottom className={classes.content}>
            <TruncatedOverview overview={content} maxLine={8} variant="body2" />
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
