import { styled } from '@material-ui/core/styles';
import { Fab as MuiFab } from '@material-ui/core';

const Fab = styled(MuiFab)(({
  theme,
}) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.brokenImage.border}`,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  '&:active': {
    boxShadow: 'none',
  },
  color: theme.palette.text.primary,
}));

export default Fab;
