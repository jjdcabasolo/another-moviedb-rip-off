import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  SvgIcon,
  Tooltip,
} from '@material-ui/core';
import { ShareTwoTone } from '@material-ui/icons';

import Facebook from '../../../assets/images/013-facebook';
import Instagram from '../../../assets/images/014-instagram';
import Twitter from '../../../assets/images/004-twitter';
import YouTube from '../../../assets/images/018-youtube';

import { snackbarActions } from '../../../reducers/ducks';

import {
  IMDB_LOGO_DARK,
  IMDB_LOGO,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const ItemLinks = ({
  facebook,
  imdb,
  instagram,
  tmdb,
  twitter,
  youtube,
}) => {
  const classes = useStyles();

  const darkMode = useSelector((state) => state.sidebar.darkMode);
  const dispatch = useDispatch();

  const [start, setStart] = useState('');

  useEffect(() => {
    const links = [facebook, instagram, twitter, youtube, imdb, tmdb].filter((e) => e !== null);
    setStart(links[0] || '');
  }, [facebook, instagram, twitter, youtube, imdb, tmdb]);

  const handleShareLinkClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      dispatch(snackbarActions.showSnackbar(`Link copied to clipboard!`, 'success'));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on copying to clipboard: ${error}`, 'error'));
    });
  };

  const renderSocialNetworkLinks = (src, link, title, isImg) => (
    <Grid item>
      <Tooltip title={title}>
        <IconButton
          edge={start === link ? 'start' : false}
          onClick={() => window.open(link, '_blank')}
          className={classes.iconButton}
        >
          {isImg ? src : <SvgIcon>{src}</SvgIcon>}
        </IconButton>
      </Tooltip>
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
    <Grid container spacing={1}>
      { facebook && facebook !== null && renderSocialNetworkLinks(<Facebook />, facebook, 'Facebook')}
      { instagram && instagram !== null && renderSocialNetworkLinks(<Instagram />, instagram, 'Instagram')}
      { twitter && twitter !== null && renderSocialNetworkLinks(<Twitter />, twitter, 'Twitter')}
      { youtube && youtube !== null && renderSocialNetworkLinks(<YouTube />, youtube, 'Trailer at YouTube')}
      { imdb && imdb !== null && renderSocialNetworkLinks(renderImgLogo('IMDb Logo', IMDB_LOGO_DARK, IMDB_LOGO), imdb, 'IMDb', true)}
      { tmdb && tmdb !== null && renderSocialNetworkLinks(renderImgLogo('TMDb Logo', TMDB_LOGO_DARK, TMDB_LOGO), tmdb, 'TMDb', true)}
      <Grid item>
        <Tooltip title="Share">
          <IconButton
            onClick={handleShareLinkClick}
            className={classes.iconButton}
          >
            <ShareTwoTone />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

ItemLinks.defaultProps = {
  facebook: null,
  imdb: null,
  instagram: null,
  tmdb: null,
  twitter: null,
  youtube: null,
};

ItemLinks.propTypes = {
  facebook: PropTypes.string,
  imdb: PropTypes.string,
  instagram: PropTypes.string,
  tmdb: PropTypes.string,
  twitter: PropTypes.string,
  youtube: PropTypes.string,
};

export default ItemLinks;
