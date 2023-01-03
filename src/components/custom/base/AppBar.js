import { styled } from "@material-ui/core/styles";
import { AppBar as MuiAppBar } from "@material-ui/core";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.colorScheme.background,
  borderBottom: `1px solid ${theme.palette.colorScheme.divider}`,
  boxShadow: "none",
}));

export default AppBar;
