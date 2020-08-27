import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Helmet as ReactHelmet } from 'react-helmet';

const Helmet = ({ isDefault }) => {
  const activeTab = useSelector((state) => state.sidebar.activeTab);

  if (activeTab === 'movies' && !isDefault) {
    return (
      <ReactHelmet>
        <title>Movies</title>
        <meta name="description" content="Another The Movie Database Rip-off's (ATMDbRo) list of movies that offers 5 types of categories - Now Playing, Upcoming, Popular, Top Rated, and Highest Grossing." />
        <meta name="keywords" content="ATMDbRo,atmdbro,Another The Movie Database Rip-off,another the movie database rip-off,ATMDbRo Movies,atmdbro movies" />
        <link rel="canonical" href="https://jjdcabasolo.github.io/another-moviedb-rip-off/#/movies" />
      </ReactHelmet>
    );
  } if (activeTab === 'tvshows' && !isDefault) {
    return (
      <ReactHelmet>
        <title>TV Shows</title>
        <meta name="description" content="Another The Movie Database Rip-off's (ATMDbRo) list of tv shows that offers 4 types of categories - Airing Today, On The Air, Popular, and Top Rated." />
        <meta name="keywords" content="ATMDbRo,atmdbro,Another The Movie Database Rip-off,another the movie database rip-off,ATMDbRo TV Shows,atmdbro tv shows" />
        <link rel="canonical" href="https://jjdcabasolo.github.io/another-moviedb-rip-off/#/tvshows" />
      </ReactHelmet>
    );
  }
  return (
    <ReactHelmet titleTemplate="%s - Another TMDb Rip-off (ATMDbRo)" defaultTitle="Another TMDb Rip-off (ATMDbRo)">
      <meta name="description" content="Another The Movie Database Rip-off (ATMDbRo) lists movies and TV shows of different categories - all coming from TMDb. It is TMDb, but it is a rip-off." />
      <meta name="keywords" content="ATMDbRo,atmdbro,Another The Movie Database Rip-off,another the movie database rip-off" />
      <link rel="canonical" href="https://jjdcabasolo.github.io/another-moviedb-rip-off/" />
    </ReactHelmet>
  );
};

Helmet.propTypes = {
  isDefault: PropTypes.bool.isRequired,
};

export default Helmet;
