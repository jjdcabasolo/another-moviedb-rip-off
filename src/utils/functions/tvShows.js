export const getTVShowStatus = status => {
  if (status === 'Ended') return 'Finished';
  else if (status === 'Returning Series') return 'Ongoing';
  return 'New undefined status!';
};
