import { styled } from "@material-ui/core/styles";
import { Chip as MuiChip } from "@material-ui/core";

const Chip = styled(MuiChip)(({ theme }) => ({
  border: `1px solid ${theme.palette.colorScheme.divider}`,
  color: theme.palette.colorScheme.secondaryText,
  textTransform: "lowercase",
  "& .MuiAvatar-root": {
    borderRadius: theme.spacing(2, 0, 0, 2),
    width: theme.spacing(6),
    height: theme.spacing(4),
    marginLeft: 0,
    marginRight: 0,
  },
}));

export default Chip;
