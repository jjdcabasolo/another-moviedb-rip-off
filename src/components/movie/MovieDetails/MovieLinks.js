import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography, Link, SvgIcon } from '@material-ui/core';

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

const useStyles = makeStyles(() => ({
  logo: {
    width: '1em',
  },
}));

const MovieLinks = () => {
  const classes = useStyles();

  const darkMode = useSelector(state => state.sidebar.darkMode);
  const movie = useSelector(state => state.movies.movie);

  const { facebook, instagram, twitter, youtube, imdb, tmdb } = movie;

  const renderSocialNetworkLinks = (src, link, isImg) => (
    <Grid item>
      <IconButton onClick={() => window.open(link, '_blank')}>
        { isImg ? src : <SvgIcon>{src}</SvgIcon> }
      </IconButton>
    </Grid>
  );

  const renderImgLogo = (alt, logoDark, logo) => (
    <img
      alt={alt}
      className={classes.logo}
      src={darkMode ? logoDark : logo}
    />
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid container xs={12} item spacing={1}>
          { facebook !== null && renderSocialNetworkLinks(<Facebook />, facebook) }
          { instagram !== null && renderSocialNetworkLinks(<Instagram />, instagram) }
          { twitter !== null && renderSocialNetworkLinks(<Twitter />, twitter) }
          { youtube !== null && renderSocialNetworkLinks(<YouTube />, youtube) }
          { imdb !== null && renderSocialNetworkLinks(renderImgLogo("IMDb Logo", IMDB_LOGO_DARK, IMDB_LOGO), imdb, true) }
          { tmdb !== null && renderSocialNetworkLinks(renderImgLogo("TMDb Logo", TMDB_LOGO_DARK, TMDB_LOGO), tmdb, true) }
        </Grid>
        <Grid item>
          <Typography variant="caption">
            Icons made by&nbsp;
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link>
            &nbsp;from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieLinks;
