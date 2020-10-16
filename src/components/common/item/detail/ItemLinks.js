import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
} from '@material-ui/core';

import Facebook from '../../../../assets/images/013-facebook';
import Instagram from '../../../../assets/images/014-instagram';
import Twitter from '../../../../assets/images/004-twitter';
import YouTube from '../../../../assets/images/018-youtube';

import {
  IMDB_LOGO_DARK,
  IMDB_LOGO,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
} from '../../../../constants';

const useStyles = makeStyles(() => ({
  logo: {
    width: '1em',
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

  const [start, setStart] = useState('');

  useEffect(() => {
    const links = [facebook, instagram, twitter, youtube, imdb, tmdb].filter((e) => e !== null);
    setStart(links[0] || '');
  }, []);

  const renderSocialNetworkLinks = (src, link, title, isImg) => (
    <Grid item>
      <Tooltip title={title}>
        <IconButton
          edge={start === link ? 'start' : false}
          onClick={() => window.open(link, '_blank')}
        >
          { isImg ? src : <SvgIcon>{src}</SvgIcon> }
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
    <>
      <Grid container spacing={2}>
        <Grid container xs={12} item spacing={1}>
          { facebook !== null && renderSocialNetworkLinks(<Facebook />, facebook, 'Facebook') }
          { instagram !== null && renderSocialNetworkLinks(<Instagram />, instagram, 'Instagram') }
          { twitter !== null && renderSocialNetworkLinks(<Twitter />, twitter, 'Twitter') }
          { youtube !== null && renderSocialNetworkLinks(<YouTube />, youtube, 'YouTube') }
          { imdb !== null && renderSocialNetworkLinks(renderImgLogo('IMDb Logo', IMDB_LOGO_DARK, IMDB_LOGO), imdb, 'IMDb', true) }
          { tmdb !== null && renderSocialNetworkLinks(renderImgLogo('TMDb Logo', TMDB_LOGO_DARK, TMDB_LOGO), tmdb, 'TMDb', true) }
        </Grid>
        {/* <Grid item>
          <Typography variant="caption">
            Icons made by&nbsp;
            <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link>
            &nbsp;from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link>
          </Typography>
        </Grid> */}
      </Grid>
    </>
  );
};

ItemLinks.propTypes = {
  facebook: PropTypes.string.isRequired,
  imdb: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  tmdb: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  youtube: PropTypes.string.isRequired,
};

export default ItemLinks;
