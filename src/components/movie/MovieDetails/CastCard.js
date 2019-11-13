import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  mediaCard: {
    height: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(30),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(35),
    },
    width: '100%',
  },
  typoOverlay: {
    position: 'absolute',
    marginTop: theme.spacing(-11),
    padding: theme.spacing(4, 2, 2, 2),
    color: theme.palette.common.white,
    pointerEvents: 'none',
    overflow: 'hidden',
    width: '100%',
    backgroundImage: `linear-gradient(to top, rgba(33, 33, 33, 0.6), #0000)`,
  },
  brokenImgContainer: {
    position: 'absolute',
    padding: theme.spacing(2),
  },
  subtitle: {
    fontWeight: '400',
  },
  title: {
    letterSpacing: '0.03em',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const CastCard = ({ content, col }) => {
  const classes = useStyles();

  if (!content) return <></>;

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">Cast has no available image.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (content && content.profile_path) imagePath += `/w780${content.profile_path}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid item xs={col}>
      <Card>
        <CardActionArea>
          { !(typeof (imagePath) === 'string') && imagePath }
          <CardMedia className={classes.mediaCard} image={imagePath} />
          <div variant="button" className={classes.typoOverlay}>
            <Typography variant="body1" className={classes.title} noWrap>
              {content.character}
            </Typography>
            <Typography vairant="body2" className={classes.subtitle} noWrap>
              {content.name}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CastCard;
