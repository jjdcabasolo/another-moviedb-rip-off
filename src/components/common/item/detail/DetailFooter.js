import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Link,
  Typography,
} from '@material-ui/core';

import {
  API_KEY_DIALOG_TMDB_LINK,
  TMDB_SIGN_UP,
} from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(4),
  },
}));

const DetailFooter = ({ title, year, companies, link }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing="3" className={classes.footer}>
        <Grid item xs="12">
          <Typography variant="body2" gutterBottom color="textSecondary">
            {`${title} (${year})${companies.length > 0 ? ` © ${companies.join(', ')}` : ''}.`}
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" gutterBottom color="textSecondary">
            {'All contents came from the community-built movie and TV database, '}
            <Link href={API_KEY_DIALOG_TMDB_LINK}>
              The Movie Database (TMDb)
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" gutterBottom color="textSecondary">
            {`If you want to contribute to ${title}'s TMDb page, you can visit to this `}
            <Link href={link}>
              link
            </Link>
            .
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {'To contribute, you must create a TMDb account '}
            <Link href={TMDB_SIGN_UP}>
              here
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" color="textSecondary">
            2020 All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" color="textSecondary">
            Made with ❤ and TMDb by jjdcabasolo.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

DetailFooter.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default DetailFooter;
