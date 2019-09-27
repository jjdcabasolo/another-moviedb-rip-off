import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import {
  API_KEY_DIALOG_TITLE,
  API_KEY_DIALOG_SUBTITLE,
  API_KEY_DIALOG_TMDB_LINK,
  API_KEY_DIALOG_NOTE
} from '../../constants/movie';

const useStyles = makeStyles(theme => ({
  note: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.subtitle2.fontSize,
  },
}));

export default function APIKeyDialog() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Enter API key
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {API_KEY_DIALOG_TITLE}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {API_KEY_DIALOG_SUBTITLE}
            <Link href={API_KEY_DIALOG_TMDB_LINK}>
              Learn more.
            </Link>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="apikey"
            label="TMDb API key"
            fullWidth
            variant="outlined"
          />
          <DialogContentText className={classes.note}>
            {API_KEY_DIALOG_NOTE}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}