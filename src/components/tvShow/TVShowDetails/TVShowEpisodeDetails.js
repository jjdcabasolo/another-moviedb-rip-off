import React from 'react';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { tvShowsActions } from '../../../reducers/ducks';

import { selectEpisode } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const TVShowEpisodeDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const episodes = useSelector((state) => state.tvShows.episodes);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const { name, tmdb } = tvShow;

  const {
    air_date: airDate,
    overview,
  } = selectEpisode(episodes, selectedEpisode);

  const handleEpisodeChange = () => {
    dispatch(tvShowsActions.setSeasonDrawerSelectedSeason(true));
    dispatch(tvShowsActions.setSeasonDrawer(true));
  };

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="textSecondary">
          {`${airDate ? moment(airDate).format('MMM D, YYYY') : 'No release date.'}`}
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          {`Episode ${selectedEpisode} of ${episodes.length}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {overview
          ? (
            <Typography variant="body1">
              {overview}
            </Typography>
          )
          : (
            <>
              <Typography variant="body1">
                There is no description yet.
              </Typography>
              <br />
              <Typography variant="body1">
                {`Contribute now on TMDb's ${name} `}
                <Link href={`${tmdb}`}>page</Link>
                .
              </Typography>
            </>
          )}
      </Grid>
      <Grid
        className={classes.button}
        container
        item
        justify="flex-end"
        xs={12}
      >
        <Button
          onClick={handleEpisodeChange}
          size={isMobile ? 'small' : 'medium'}
          variant="outlined"
        >
          Change episode
        </Button>
      </Grid>
    </Grid>
  );
};

export default TVShowEpisodeDetails;
