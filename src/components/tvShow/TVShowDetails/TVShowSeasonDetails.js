import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Link,
  Typography,
} from '@material-ui/core';

import TruncatedOverview from '../../common/TruncatedOverview';

import { selectSeason } from '../../../utils/functions';

import { TV_SHOW_OVERVIEW_MAX_WORDS } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const TVShowSeasonDetails = () => {
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);

  const { seasons, name, tmdb } = tvShow;

  const {
    air_date: airDate,
    episode_count: episodeCount,
    overview,
    name: seasonName,
  } = selectSeason(seasons, selectedSeason);

  return (
    <Grid item container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {seasonName}
        </Typography>
        <Typography color="textSecondary">
          {airDate ? moment(airDate).format('MMM D, YYYY') : 'No release date.'}
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          {`${episodeCount} episodes`}
        </Typography>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          {overview
            ? (
              <TruncatedOverview overview={overview} maxWords={TV_SHOW_OVERVIEW_MAX_WORDS} />
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
      </Grid>
    </Grid>
  );
};

export default TVShowSeasonDetails;
