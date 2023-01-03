import { styled } from "@material-ui/core/styles";
import { Fab as MuiFab } from "@material-ui/core";

const Fab = styled(MuiFab)(({ theme }) => ({
  "& svg *[fill]": {
    fill: theme.palette.colorScheme.svgStrokeFill,
  },
  "& svg *[stroke]": {
    stroke: theme.palette.colorScheme.svgStrokeFill,
  },
  backgroundColor: theme.palette.colorScheme.background,
  border: `1px solid ${theme.palette.brokenImage.border}`,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.colorScheme.sectionHeaderBackground,
    "@media (hover: none)": {
      boxShadow: "none",
    },
  },
  "&:active": {
    boxShadow: "none",
  },
  color: theme.palette.text.primary,
}));

export default Fab;
