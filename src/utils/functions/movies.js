export const getCastCol = (isMobile, isSmallTablet) => {
  if (isMobile) return 2;
  if (isSmallTablet) return 3;
  return 4;
};

export const getCrewCol = (isMobile, isSmallTablet) => {
  if (isMobile) return 1;
  if (isSmallTablet) return 2;
  return 3;
};
