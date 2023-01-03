import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

const ResponsiveComponent = ({
  desktopComponent = null,
  mobileComponent = null,
  tabletComponent = null,
}) => {
  // https://material-ui.com/customization/breakpoints/
  // value         |0px     600px    960px    1280px   1920px
  // key           |xs      sm       md       lg       xl
  // screen width  |--------|--------|--------|--------|-------->
  // range         |   xs   |   sm   |   md   |   lg   |   xl
  // responsiveComp|-mobile-|-----tablet------|-----desktop-----

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return mobileComponent;
  }

  // if all components are declared/specified
  if (isDesktop) return desktopComponent;
  if (isTablet) return tabletComponent;
  return mobileComponent;
};

export default ResponsiveComponent;
