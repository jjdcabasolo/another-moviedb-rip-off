import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Note from '../common/Note';
import ResponsiveComponent from '../../utils/components/ResponsiveComponent';

import { NOTE_NOT_FOUND } from '../../constants';

const useStyles = makeStyles(theme => ({
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  const renderNote = () => <Note details={NOTE_NOT_FOUND} />;

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
