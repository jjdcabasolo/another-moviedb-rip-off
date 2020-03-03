import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const ResponsiveComponent = ({
  mobileComponent,
  tabletComponent,
  desktopComponent,
}) => {
  const theme = useTheme();

  // https://material-ui.com/customization/breakpoints/
  // value         |0px     600px    960px    1280px   1920px
  // key           |xs      sm       md       lg       xl
  // screen width  |--------|--------|--------|--------|-------->
  // range         |   xs   |   sm   |   md   |   lg   |   xl
  // responsiveComp|-mobile-|-----tablet------|-----desktop-----

  const desktop = useMediaQuery(theme.breakpoints.up('lg'));
  const tablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  // const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  // if all components are declared/specified
  if (desktop) return desktopComponent;
  if (tablet) return tabletComponent;
  return mobileComponent;
};

export default ResponsiveComponent;
