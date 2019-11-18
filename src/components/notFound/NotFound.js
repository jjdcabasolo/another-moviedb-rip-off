import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import Note from '../common/Note';
import ResponsiveComponent from '../../utils/components/ResponsiveComponent';

import { sidebarActions } from '../../reducers/ducks';

import { NOTE_PAGE_NOT_FOUND } from '../../constants';

const useStyles = makeStyles(theme => ({
  note: {
    padding: theme.spacing(8, 2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const useTP = () => {
    dispatch(sidebarActions.setActiveTab('movies'));
    history.push('/'); 
  };

  const renderNote = () => (
    <>
      <Note details={NOTE_PAGE_NOT_FOUND} />
      <Button className={classes.button} onClick={useTP}>Use TP</Button>
    </>
  );

  return (
    <ResponsiveComponent
      mobileComponent={
        <div className={classes.note}>
          {renderNote()}
        </div>
      }
      tabletComponent={renderNote()}
      desktopComponent={renderNote()}
    />
  );
};

export default NotFound;
