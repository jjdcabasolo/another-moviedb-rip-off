import { styled } from "@material-ui/core/styles";
import { Typography as MuiTypography } from "@material-ui/core";

const Typography = styled(MuiTypography)(() => ({
  textTransform: "lowercase",
}));

export default Typography;
