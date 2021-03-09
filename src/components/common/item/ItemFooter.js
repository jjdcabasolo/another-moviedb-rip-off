import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Link,
  Typography,
} from '@material-ui/core';

import {
  OpenInNew,
} from '@material-ui/icons';

import { enumerate } from '../../../utils/functions';

import {
  API_KEY_DIALOG_TMDB_LINK,
  TMDB_SIGN_UP,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(4),
  },
  icon: {
    marginBottom: -theme.spacing(0.25),
    marginLeft: theme.spacing(0.25),
    fontSize: '1em',
  },
}));

const ItemFooter = ({
  companies,
  link,
  title,
  year,
}) => {
  const classes = useStyles();

  const renderLinkOpenNewTab = (content, href) => (
    <Link href={href} rel="noopener" target="_blank">
      {content}
      <OpenInNew className={classes.icon} />
    </Link>
  );

  return (
    <Grid container spacing={3} className={classes.footer}>
      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom color="textSecondary">
          {`${title} (${year})${companies.length > 0 ? ` © ${enumerate(companies)}` : ''}.`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom color="textSecondary">
          Noticed something wrong on the details? Visit&nbsp;
          {renderLinkOpenNewTab(`${title}'s TMDb page`, link)}
          &nbsp;to contribute!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          But first, you must&nbsp;
          {renderLinkOpenNewTab('create a TMDb account', TMDB_SIGN_UP)}
          .
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom color="textSecondary">
          All contents came from the community-built movie and TV database,&nbsp;
          {renderLinkOpenNewTab('The Movie Database (TMDb)', API_KEY_DIALOG_TMDB_LINK)}
          .
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          Social media icons made by&nbsp;
          {renderLinkOpenNewTab('Freepik', 'https://www.flaticon.com/authors/freepik')}
          &nbsp;from&nbsp;
          {renderLinkOpenNewTab('www.flaticon.com', 'https://www.flaticon.com/')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          © 2020 All Rights Reserved.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          Made with y540 and TMDb by jjdcabasolo
        </Typography>
      </Grid>
    </Grid>
  );
};

ItemFooter.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default ItemFooter;
