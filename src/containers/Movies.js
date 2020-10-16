import React, { useEffect, useState } from 'react';

import moment from 'moment';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import ComponentLoader from '../components/common/ComponentLoader';
import DetailFooter from '../components/common/item/detail/DetailFooter';
import ImageCard from '../components/common/item/detail/ImageCard';
import MovieBudget from '../components/movie/MovieDetails/MovieBudget';
import MovieCast from '../components/movie/MovieDetails/MovieCast';
import MovieCrew from '../components/movie/MovieDetails/MovieCrew';
import MovieHeader from '../components/movie/MovieDetails/MovieHeader';
import MovieProduction from '../components/movie/MovieDetails/MovieProduction';
import Note from '../components/common/Note';
import Section from '../components/common/item/detail/Section';

import { getMovieDetails } from '../api';

import { moviesActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

import { NOTE_NO_SELECTED_MOVIE, NOTE_MOVIE_NOT_FOUND } from '../constants';

const useStyles = makeStyles((theme) => ({
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
      height: `${theme.spacing(60)}px !important`,
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

  const movie = useSelector((state) => state.movies.movie);
  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const { movieId } = useParams();

  const {
    belongs_to_collection: belongsToCollection,
    budget,
    cast,
    crew,
    production_companies: productionCompanies,
    revenue,
    youtube,
    original_title: originalTitle,
    release_date: releaseDate,
    title,
    tmdb,
  } = movie;

  useEffect(() => {
    if (movieId) {
      getMovieDetails(decryptKey(), movieId, (response) => {
        dispatch(moviesActions.setActiveMovie(response));
        dispatch(moviesActions.setDetailsLoading(false));
        setIsLoaded(true);
      }, (error) => {
        if (error.response) {
          dispatch(moviesActions.setActiveMovie({}));
          setIsLoaded(error.response.data.status_code);
        }
      });
    }
    // setTimeout(() => window.scrollTo(0, 0), 100);
  }, [movieId, dispatch]);

  if (movieId === undefined) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_NO_SELECTED_MOVIE} />
      </div>
    );
  }

  if (isMovieLoading) {
    return <ComponentLoader />;
  }

  if (isLoaded === 34) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_MOVIE_NOT_FOUND} />
      </div>
    );
  }

  if (Object.keys(movie).length === 0 && movie.constructor === Object) {
    return <ComponentLoader />;
  }

  return (
    <Grid container spacing={8} className={classes.root}>
      <Section
        anchorId="movie-header"
        divider={!(budget && revenue)}
        visible={movie}
      >
        <MovieHeader />
      </Section>

      <Section
        visible={budget && revenue}
        anchorId="movie-budget"
      >
        <MovieBudget />
      </Section>

      <Section
        anchorId="movie-trailer"
        title="Trailer"
        visible={youtube}
      >
        <ReactPlayer
          className={classes.trailer}
          controls
          light
          pip
          url={youtube}
          width="100%"
        />
      </Section>

      <Section
        anchorId="movie-cast"
        title="Cast"
        visible={cast.length > 0}
      >
        <MovieCast />
      </Section>

      <Section
        anchorId="movie-crew"
        title="Crew"
        visible={crew.length > 0}
      >
        <MovieCrew />
      </Section>

      <Section
        anchorId="movie-collection"
        col={isTabletAbove ? 6 : 12}
        divider={false}
        title="Collection"
        visible={belongsToCollection}
      >
        <ImageCard content={belongsToCollection} />
      </Section>

      <Section
        anchorId="movie-production"
        col={isTabletAbove && belongsToCollection ? 6 : 12}
        divider
        title="Production"
        visible={productionCompanies}
      >
        <MovieProduction />
      </Section>

      <Section
        anchorId="movie-end-credits"
        divider={false}
      >
        <DetailFooter
          companies={productionCompanies.map((e) => e.name)}
          link={tmdb}
          title={title || originalTitle}
          year={moment(releaseDate).format('YYYY')}
        />
      </Section>
    </Grid>
  );
};

export default Movies;
