import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';

import TruncatedOverview from '../../common/TruncatedOverview';

import { selectSeason } from '../../../utils/functions';

import { NO_DATE_TEXT, OVERVIEW_MAX_WORDS } from '../../../constants';

const TVShowSeasonDetails = () => {
  const episodes = useSelector((state) => state.tvShows.episodes);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const { seasons } = tvShow;

  const {
    air_date: airDate,
    name: seasonName,
    overview,
  } = selectSeason(seasons, selectedSeason);

  const filteredEpisodes = episodes.filter((e) => (!e.air_date && e.air_date.length > 0)
    || moment(e.air_date).diff(moment()) < 0).length;

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {seasonName}
        </Typography>
        <Typography color="textSecondary">
          {airDate ? moment(airDate).format('MMM D, YYYY') : NO_DATE_TEXT}
          {filteredEpisodes > 0 && (
            <>
              &nbsp;&nbsp;&middot;&nbsp;&nbsp;
              {`${filteredEpisodes} episode${filteredEpisodes > 1 ? 's' : ''}`}
            </>
          )}
        </Typography>
      </Grid>
      {overview && (
        <Grid item xs={12}>
          <TruncatedOverview
            overview={overview}
            maxWords={OVERVIEW_MAX_WORDS}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TVShowSeasonDetails;
