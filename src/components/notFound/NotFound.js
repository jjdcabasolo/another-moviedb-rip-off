import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, useMediaQuery } from "@material-ui/core";

import Note from "../common/Note";

import { sidebarActions } from "../../reducers/ducks";

import { NOTE_PAGE_NOT_FOUND } from "../../constants";

const useStyles = makeStyles((theme) => ({
  note: {
    padding: theme.spacing(16, 2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const useTP = () => {
    dispatch(sidebarActions.setActiveTab("movies"));
    history.push("/");
  };

  const renderNote = () => (
    <>
      <Note details={NOTE_PAGE_NOT_FOUND} />
      <Button
        className={classes.button}
        onClick={useTP}
        size={isMobile ? "small" : "medium"}
        variant="outlined"
      >
        Go back to home
      </Button>
    </>
  );

  return <div className={classes.note}>{renderNote()}</div>;
};

export default NotFound;
