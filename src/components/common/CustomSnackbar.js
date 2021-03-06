import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  IconButton,
  Slide,
  Snackbar,
  SnackbarContent,
  useMediaQuery,
} from '@material-ui/core';
import {
  CheckCircleOutlineOutlined,
  Close,
  ErrorOutlineOutlined,
} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
}));

const CustomSnackbar = ({
  handleOnClose,
  isOpen,
  message,
  variant,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const darkMode = useSelector((state) => state.sidebar.darkMode);

  const closeIcon = (
    <IconButton
      key="close"
      onClick={handleOnClose}
      color="inherit"
    >
      <Close />
    </IconButton>
  );

  const snackbarSettings = {
    success: {
      action: [closeIcon],
      autoHideDuration: 6000,
      color: (darkMode ? green[200] : green[600]),
      icon: (<CheckCircleOutlineOutlined className={classes.icon} />),
    },
    error: {
      action: [closeIcon],
      autoHideDuration: 6000,
      color: (darkMode ? red[200] : red[500]),
      icon: (<ErrorOutlineOutlined className={classes.icon} />),
    },
  };

  const snackbarMessage = (
    <span className={classes.message}>
      {snackbarSettings[variant].icon}
      {message}
    </span>
  );

  return (
    <Snackbar
      anchorOrigin={isMobile
        ? { vertical: 'bottom', horizontal: 'left' }
        : { vertical: 'top', horizontal: 'center' }}
      autoHideDuration={snackbarSettings[variant].autoHideDuration}
      onClose={handleOnClose}
      open={isOpen}
      TransitionComponent={Slide}
    >
      <SnackbarContent
        style={{ backgroundColor: snackbarSettings[variant].color, maxWidth: 'unset' }}
        message={snackbarMessage}
        action={snackbarSettings[variant].action}
      />
    </Snackbar>
  );
};

CustomSnackbar.propTypes = {
  handleOnClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default CustomSnackbar;
