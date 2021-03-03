// code taken from: https://gist.github.com/nmsdvid/8807205
// export const debounceEvent = (callback, time) => {
//   let interval;
//   return (...args) => {
//     clearTimeout(interval);
//     console.log('debounce.js', callback, time, interval);
//     interval = setTimeout(() => {
//       interval = null;
//       callback(...args);
//     }, time);
//   };
// };

export const debounceEvent = (callback, time = 250, interval) =>
  (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => callback(...args), time);
  };

export default debounceEvent;
