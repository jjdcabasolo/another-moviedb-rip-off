import { styled } from "@material-ui/core/styles";
import { IconButton as MuiIconButton } from "@material-ui/core";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.colorScheme.background,
  border: `1px solid ${theme.palette.colorScheme.divider}`,
}));

export default IconButton;
