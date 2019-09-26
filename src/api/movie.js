import axios from './axiosConfig';

export const getPopularMovies = () =>
  axios
    .get('/movie/popular')
    .then(response => console.log(response))
    .catch(error => console.log(error))
  ;
