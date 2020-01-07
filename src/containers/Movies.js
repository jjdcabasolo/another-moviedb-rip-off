import React, { useEffect, useState } from 'react';

import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import ComponentLoader from '../components/common/ComponentLoader';
import Note from '../components/common/Note';
import MovieHeader from '../components/movie/MovieDetails/MovieHeader';
import MovieCast from '../components/movie/MovieDetails/MovieCast';
import MovieCrew from '../components/movie/MovieDetails/MovieCrew';
import MovieLinks from '../components/movie/MovieDetails/MovieLinks';
import MovieBudget from '../components/movie/MovieDetails/MovieBudget';
import MovieProduction from '../components/movie/MovieDetails/MovieProduction';
import MovieCollection from '../components/movie/MovieDetails/MovieCollection';
import Section from '../components/movie/MovieDetails/Section';

import { getMovieDetails } from '../api';

import { moviesActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

import { NOTE_NO_SELECTED_MOVIE, NOTE_MOVIE_NOT_FOUND } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  trailer: {
    [theme.breakpoints.down('sm')]: {
      height: `${theme.spacing(30)}px !important`,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      height: `${theme.spacing(40)}px !important`,
    },
    [theme.breakpoints.up('md')]: {
      height: `${theme.spacing(50)}px !important`,
    },
  },
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const Movies = () => {
  const theme = useTheme();
  const isTabletAbove = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  const movie = useSelector(state => state.movies.movie);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const { movieId } = useParams();

  const { budget, revenue, youtube, production_companies, belongs_to_collection } = movie;

  useEffect(() => {
    getMovieDetails(decryptKey(), movieId, response => {
      dispatch(moviesActions.setActiveMovie(response));
      dispatch(moviesActions.setDetailsLoading(false));
      setIsLoaded(true);
    }, error => {
      if (error.response) {
        dispatch(moviesActions.setActiveMovie({}));
        setIsLoaded(error.response.data.status_code);
      }
    });
    // setTimeout(() => window.scrollTo(0, 0), 100);
  }, [movieId, dispatch]);

  if (movieId === undefined) return (
    <div className={classes.note}>
      <Note details={NOTE_NO_SELECTED_MOVIE} />
    </div>
  );

  if (isMovieLoading) return <ComponentLoader />;

  if (isLoaded === 34) return (
    <div className={classes.note}>
      <Note details={NOTE_MOVIE_NOT_FOUND} />
    </div>
  );

  if (Object.keys(movie).length === 0 && movie.constructor === Object) return <ComponentLoader />;
    
  return (
    <Grid container spacing={8} className={classes.root}>
      <Section divider={!(budget && revenue)}>
        <MovieHeader />
      </Section>

      <Section visible={budget && revenue}>
        <MovieBudget />
      </Section>

      <Section title="Trailer" visible={youtube}>
        <ReactPlayer
          className={classes.trailer}
          controls
          light
          pip
          url={youtube}
          width="100%"
        />
      </Section>

      <Section title="Cast">
        <MovieCast />
      </Section>

      <Section title="Crew">
        <MovieCrew />
      </Section>

      <Section divider={false} visible={belongs_to_collection} title="Collection" col={isTabletAbove ? 6 : 12}>
        <MovieCollection />
      </Section>

      <Section divider={false} visible={production_companies} title="Production" col={isTabletAbove && belongs_to_collection ? 6 : 12}>
        <MovieProduction />
      </Section>

      <Section divider={false}>
        <MovieLinks />
      </Section>
    </Grid>
  );
};

export default Movies;
