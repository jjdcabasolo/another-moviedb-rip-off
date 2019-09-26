import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Slide,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import {
  Close,
  ErrorOutlineOutlined,
  CheckCircleOutlineOutlined,
} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
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

const CustomSnackbar = (props) => {
  const classes = useStyles();

  const {
    handleOnClose,
    isOpen,
    message,
    variant,
  } = props;

  const darkMode = useSelector(state => state.sidebar.darkMode);

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
      autoHideDuration: 3000,
      color: (darkMode ? green[200] : green[600]),
      icon: (<CheckCircleOutlineOutlined className={classes.icon} />),
      origin: { vertical: 'top', horizontal: 'right' },
    },
    error: {
      action: [closeIcon],
      autoHideDuration: 3000,
      color: (darkMode ? red[200] : red[500]),
      icon: (<ErrorOutlineOutlined className={classes.icon} />),
      origin: { vertical: 'top', horizontal: 'right' },
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
      anchorOrigin={snackbarSettings[variant].origin}
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
  classes: PropTypes.shape({}).isRequired,
  handleOnClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default CustomSnackbar;
