import React from "react";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Slide,
  Snackbar,
  SnackbarContent,
  useMediaQuery,
} from "@material-ui/core";
import IconButton from "../custom/composed/IconButton";
import ErrorIcon from "../../assets/icons/error";
import SuccessIcon from "../../assets/icons/success";
import CloseIcon from "../../assets/icons/close";

const useStyles = makeStyles((theme) => ({
  message: {
    display: "flex",
    alignItems: "center",
  },
  snackbarContent: {
    backgroundColor: theme.palette.colorScheme.background,
    color: theme.palette.text.primary,
  },
}));

const CustomSnackbar = ({ handleOnClose, isOpen, message, variant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const closeIcon = (
    <IconButton
      svgSrc={<CloseIcon />}
      handleOnClick={handleOnClose}
      tooltipTitle="Close snackbar"
      color="inherit"
    />
  );

  const snackbarSettings = {
    success: {
      action: [closeIcon],
      autoHideDuration: 6000,
      icon: <SuccessIcon />,
    },
    error: {
      action: [closeIcon],
      autoHideDuration: 6000,
      icon: <ErrorIcon />,
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
      anchorOrigin={
        isMobile
          ? { vertical: "bottom", horizontal: "left" }
          : { vertical: "top", horizontal: "center" }
      }
      autoHideDuration={snackbarSettings[variant].autoHideDuration}
      onClose={handleOnClose}
      open={isOpen}
      TransitionComponent={Slide}
    >
      <SnackbarContent
        style={{
          backgroundColor: snackbarSettings[variant].color,
          maxWidth: "unset",
        }}
        className={classes.snackbarContent}
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
