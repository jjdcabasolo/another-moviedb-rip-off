export const getCastCol = (isMobile, isLowerTablet) => {
  if (isMobile) return 2;
  if (isLowerTablet) return 3;
  return 4;
};

export const getCrewCol = (isMobile, isLowerTablet) => {
  if (isMobile) return 1;
  if (isLowerTablet) return 2;
  return 3;
};
