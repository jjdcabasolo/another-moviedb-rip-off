export const truncateText = (text, length, type) => {
  switch (type) {
    case 'characters':
      if (text.length > length) return `${text.substring(0, length)}...`;
      return text;

    case 'words': {
      const fragmentedWords = text.split(' ');
      if (fragmentedWords.length <= length) return [text, false];
      return [fragmentedWords.splice(0, length).join(' '), true];
    }

    default:
      return text;
  }
};

export const evaluateLocation = (location) => {
  const result = {};

  const path = location.pathname.replace('/', '').split('/');
  if (path[0].match(/movies/g)) {
    result.movie = true;
    if (path[1] !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      result.movieId = path[1];
    }
  }

  if (path[0].match(/tvshows/g)) {
    result.tvShow = true;
    if (path[1] !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      result.tvShowId = path[1];
    }
  }

  return result;
};

// money format for millions and billions credit: https://stackoverflow.com/q/36734201
export const toMillionsOrBillions = (num) => {
  const absoluteNumber = Math.abs(Number(num));
  if (absoluteNumber >= 1.0e+9) {
    return `${(absoluteNumber / 1.0e+9).toFixed(2)}B`;
  }
  if (absoluteNumber >= 1.0e+6) {
    return `${Math.floor(absoluteNumber / 1.0e+6)}M`;
  }
  if (absoluteNumber >= 1.0e+3) {
    return `${Math.floor(absoluteNumber / 1.0e+3)}K`;
  }
  return `${absoluteNumber}`;
};
