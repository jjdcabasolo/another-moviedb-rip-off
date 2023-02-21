import { styled } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";

const Button = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.colorScheme.sectionHeaderBackground,
  border: `1px solid ${theme.palette.colorScheme.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.colorScheme.buttonText,
  textTransform: "lowercase",
}));

export default Button;
