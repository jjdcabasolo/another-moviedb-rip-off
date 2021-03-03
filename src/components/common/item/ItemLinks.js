import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Grid,
  IconButton,
  SvgIcon,
  Tooltip,
} from '@material-ui/core';
import { LinkTwoTone } from '@material-ui/icons';

import Facebook from '../../../assets/images/013-facebook';
import Instagram from '../../../assets/images/014-instagram';
import Twitter from '../../../assets/images/004-twitter';

import { snackbarActions } from '../../../reducers/ducks';

import {
  IMDB_LOGO_DARK,
  IMDB_LOGO,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  divider: {
    height: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    }
  },
  dividerContainer: {
    alignItems: 'center',
    display: 'flex',
  },
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
}) => {
  const classes = useStyles();

  const darkMode = useSelector((state) => state.sidebar.darkMode);
  const dispatch = useDispatch();

  const [start, setStart] = useState('');

  useEffect(() => {
    const links = [facebook, instagram, twitter, imdb, tmdb].filter((e) => e !== null);
    setStart(links[0] || '');
  }, [facebook, instagram, twitter, imdb, tmdb]);

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
      {facebook && facebook !== null && renderSocialNetworkLinks(<Facebook />, facebook, 'Facebook')}
      {instagram && instagram !== null && renderSocialNetworkLinks(<Instagram />, instagram, 'Instagram')}
      {twitter && twitter !== null && renderSocialNetworkLinks(<Twitter />, twitter, 'Twitter')}
      {start.match(/(facebook)|(twitter)|(instagram)/g) && (
        <Grid item className={classes.dividerContainer}>
          <Divider orientation="vertical" className={classes.divider} />
        </Grid>
      )}
      {imdb && imdb !== null && renderSocialNetworkLinks(renderImgLogo('IMDb Logo', IMDB_LOGO_DARK, IMDB_LOGO), imdb, 'IMDb', true)}
      {tmdb && tmdb !== null && renderSocialNetworkLinks(renderImgLogo('TMDb Logo', TMDB_LOGO_DARK, TMDB_LOGO), tmdb, 'TMDb', true)}
      <Grid item className={classes.dividerContainer}>
        <Divider orientation="vertical" className={classes.divider} />
      </Grid>
      <Grid item>
        <Tooltip title="Share">
          <IconButton
            onClick={handleShareLinkClick}
            className={classes.iconButton}
          >
            <LinkTwoTone />
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
};

ItemLinks.propTypes = {
  facebook: PropTypes.string,
  imdb: PropTypes.string,
  instagram: PropTypes.string,
  tmdb: PropTypes.string,
  twitter: PropTypes.string,
};

export default ItemLinks;
