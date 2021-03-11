/* eslint-disable prefer-destructuring */
// number of words for allowance before truncating the text;
import { TRUNCATION_ALLOWANCE } from '../../constants';

export const truncateText = (text, length, type) => {
  switch (type) {
    case 'characters':
      if (text.length > length) return `${text.substring(0, length)}...`;
      return text;

    case 'words': {
      const fragmentedWords = text.split(' ');
      if (fragmentedWords.length <= (length + TRUNCATION_ALLOWANCE)) {
        return [text, false];
      }
      return [fragmentedWords.splice(0, length).join(' '), true];
    }

    default:
      return text;
  }
};

// money format for millions and billions
// taken from https://stackoverflow.com/q/36734201
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

// convert camel case to sentence case
// taken from: https://stackoverflow.com/a/7225450
export const toCamelCase = (text) => {
  const result = text.replace(/([A-Z])/g, ' $1');

  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const enumerate = (array) => array.length === 2
  ? array.join(' and ')
  : array.join(', ').replace(/, ([^,]*)$/, ', and $1');
