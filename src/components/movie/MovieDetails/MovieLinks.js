import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Typography, Link, SvgIcon } from '@material-ui/core';

import CastCard from './CastCard';

import Facebook from '../../../assets/images/013-facebook';
import Instagram from '../../../assets/images/014-instagram';
import Twitter from '../../../assets/images/004-twitter';
import YouTube from '../../../assets/images/018-youtube';

import { 
  IMDB_LOGO_DARK,
  IMDB_LOGO,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
} from '../../../constants';

const useStyles = makeStyles(theme => ({
  logo: {
    width: '1em',
  },
}));

const MovieLinks = () => {
  const classes = useStyles();

  const darkMode = useSelector(state => state.sidebar.darkMode);
  const movie = useSelector(state => state.movies.movie);

  const facebookLink = movie.facebook;
  const instagramLink = movie.instagram;
  const twitterLink = movie.twitter;
  const youtubeLink = movie.youtube;
  const imdbLink = movie.imdb;
  const tmdbLink = movie.tmdb;

  const renderSocialNetworkLinks = (src, link, isImg) => (
    <IconButton onClick={() => window.open(link, '_blank')}>
      { isImg ? src : <SvgIcon>{src}</SvgIcon> }
    </IconButton>
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid container xs={12} item>
          { facebookLink !== null && renderSocialNetworkLinks(<Facebook />, facebookLink) }
          { instagramLink !== null && renderSocialNetworkLinks(<Instagram />, instagramLink) }
          { twitterLink !== null && renderSocialNetworkLinks(<Twitter />, twitterLink) }
          { youtubeLink !== null && renderSocialNetworkLinks(<YouTube />, youtubeLink) }
          { imdbLink !== null && renderSocialNetworkLinks((
            <img
              alt="TMDb Logo"
              className={classes.logo}
              src={darkMode ? IMDB_LOGO_DARK : IMDB_LOGO}
            />
          ), imdbLink, true) }
          { tmdbLink !== null && renderSocialNetworkLinks((
            <img
              alt="TMDb Logo"
              className={classes.logo}
              src={darkMode ? TMDB_LOGO_DARK : TMDB_LOGO}
            />
          ), tmdbLink, true) }
        </Grid>
        <Grid item>
          <Typography variant="caption">
            Icons made by&nbsp;
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link>&nbsp;
            from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieLinks;
