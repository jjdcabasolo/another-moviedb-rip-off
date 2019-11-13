import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Button, Typography, Icon } from '@material-ui/core';

import CastCard from './CastCard';

import Facebook from '../../../assets/images/013-facebook.svg';
import Instagram from '../../../assets/images/014-instagram.svg';
import Twitter from '../../../assets/images/004-twitter.svg';
import YouTube from '../../../assets/images/018-youtube.svg';

const useStyles = makeStyles(theme => ({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
}));

const MovieLinks = () => {
  const classes = useStyles();

  const movie = useSelector(state => state.movies.movie);

  const facebookLink = movie.facebook;
  const instagramLink = movie.instagram;
  const twitterLink = movie.twitter;
  const youtubeLink = movie.youtube;
  const imdbLink = movie.imdb;
  const tmdbLink = movie.tmdb;

  const renderSocialNetworkLinks = (src, link) => (
    <IconButton onClick={() => window.open(link, '_blank')}>
      <Icon classes={{root: classes.iconRoot}}>
        <img className={classes.imageIcon} src={src}/>
      </Icon>
    </IconButton>
  );

  const renderTextButtonLinks = (content, link) => (
    <Button onClick={() => window.open(link, '_blank')}>
      { content }
    </Button>
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid container xs={12} item>
          { facebookLink !== null && renderSocialNetworkLinks(Facebook, facebookLink) }
          { instagramLink !== null && renderSocialNetworkLinks(Instagram, instagramLink) }
          { twitterLink !== null && renderSocialNetworkLinks(Twitter, twitterLink) }
          { youtubeLink !== null && renderSocialNetworkLinks(YouTube, youtubeLink) }
          { imdbLink !== null && renderTextButtonLinks('IMDb', imdbLink) }
          { tmdbLink !== null && renderTextButtonLinks('TMDb', tmdbLink) }
        </Grid>
        <Grid item>
          <Typography variant="caption">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieLinks;
