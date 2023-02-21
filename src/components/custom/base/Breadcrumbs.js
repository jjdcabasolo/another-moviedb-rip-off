import { styled } from "@material-ui/core/styles";
import { Breadcrumbs as MuiBreadcrumbs } from "@material-ui/core";

const Breadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  fontWeight: 300,
  textTransform: "lowercase",
  color: theme.palette.colorScheme.secondaryText,
}));

export default Breadcrumbs;
