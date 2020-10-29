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
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(4),
  },
}));

const ItemFooter = ({
  companies,
  link,
  title,
  year,
}) => {
  const classes = useStyles();

  const formattedCompanies = companies.length === 2
    ? companies.join(' and ')
    : companies.join(', ').replace(/, ([^,]*)$/, ', and $1');

  return (
    <>
      <Grid container spacing="3" className={classes.footer}>
        <Grid item xs="12">
          <Typography variant="body2" gutterBottom color="textSecondary">
            {`${title} (${year})${companies.length > 0 ? ` © ${formattedCompanies}` : ''}.`}
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
            To contribute, you must&nbsp;
            <Link href={TMDB_SIGN_UP}>
              create a TMDb account
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" gutterBottom color="textSecondary">
            All contents came from the community-built movie and TV database,&nbsp;
            <Link href={API_KEY_DIALOG_TMDB_LINK}>
              The Movie Database (TMDb)
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" color="textSecondary">
            Social media icons made by&nbsp;
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link>
            &nbsp;from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link>
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" color="textSecondary">
            © 2020 All Rights Reserved.
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography variant="body2" color="textSecondary">
            Made with ❤ and TMDb by jjdcabasolo
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

ItemFooter.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default ItemFooter;
