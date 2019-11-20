export const truncateText = (text, length) => {
  if (text.length > length) return `${text.substring(0, length)}...`;
  return text;
};

export const evaluateLocation = location => {
  const result = {};

  const path = location.pathname.replace('/', '').split('/');
  if (path[0].match(/movies/g)) {
    result.movie = true;
    if (path[1] !== undefined) {
      result.movieId = path[1];
    }
  }

  if (path[0].match(/tvshows/g)) {
    result.tvShow = true;
    if (path[1] !== undefined) {
      result.tvShowId = path[1];
    }
  }

  return result;
};
