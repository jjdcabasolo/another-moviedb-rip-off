import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import {
  ErrorOutlineTwoTone,
  AccountCircleTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone,
} from '@material-ui/icons';

import { getPopularMovies } from '../../api/movie';

import { sidebarActions } from '../../reducers/ducks/sidebar';
import { snackbarActions } from '../../reducers/ducks/snackbar';

import {
  API_KEY_DIALOG_TITLE,
  API_KEY_DIALOG_SUBTITLE,
  API_KEY_DIALOG_TMDB_LINK,
  API_KEY_DIALOG_NOTE,
  API_KEY_DIALOG_MISSING_USERNAME,
  API_KEY_DIALOG_MISSING_API_KEY,
  API_KEY_DIALOG_INVALID_API_KEY,
} from '../../constants/movie';

const useStyles = makeStyles(theme => ({
  note: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.subtitle2.fontSize,
  },
  errorNote: {
    color: theme.palette.error.main,
  },
  filledInput: {
    margin: theme.spacing(1, 0),
  },
  progressWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const initState = {
  open: true,
  isApplyingKey: false,
  apiKey: {
    value: '',
    error: false,
    showAPIKey: false,
  },
  username: {
    value: '',
    error: false,
  },
};

export default function APIKeyDialog() {
  const classes = useStyles();

  const apiKey = useSelector(state => state.sidebar.apiKey);
  const username = useSelector(state => state.sidebar.username);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(initState.open);
  const [isApplyingKey, setIsApplyingKey] = useState(initState.isApplyingKey);
  const [apiKeyState, setApiKeyState] = useState(initState.apiKey);
  const [usernameState, setUsernameState] = useState(initState.apiKey);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setIsApplyingKey(initState.isApplyingKey);
    setApiKeyState(initState.apiKey);
    setUsernameState(initState.apiKey);
  };

  const handleAPIKeyChange = event => setApiKeyState({ ...apiKeyState, value: event.target.value });

  const handleUsernameChange = event => setUsernameState({ ...apiKeyState, value: event.target.value });

  const handleClickShowAPIKey = () => setApiKeyState({ ...apiKeyState, showAPIKey: !apiKeyState.showAPIKey });

  const handleMouseDownAPIKey = event => event.preventDefault();

  const handleSubmit = () => {
    const hasUsernameValue = usernameState.value !== '';
    const hasApiKeyValue = apiKeyState.value !== '';

    if (!hasUsernameValue || !hasApiKeyValue) {
      if (!hasUsernameValue) setUsernameState({ ...usernameState, error: true });
      if (!hasApiKeyValue) setApiKeyState({ ...apiKeyState, error: true });
    } else {
      setUsernameState({ ...usernameState, error: false });
      setApiKeyState({ ...apiKeyState, error: false });
      setIsApplyingKey(true);

      getPopularMovies(apiKeyState.value, () => {
        dispatch(snackbarActions.showSnackbar('TMDb API key successfully added!', 'success'));
        dispatch(sidebarActions.setAPIKey(apiKeyState.value, usernameState.value));
        handleClose();
      }, () => {
        dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
      }, () => {
        setIsApplyingKey(false);
      });
    }
  };

  const handleClearForms = () => {
    setUsernameState({ ...usernameState, value: '' });
    setApiKeyState({ ...apiKeyState, value: '' });
  };

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon className={classes.whiteText}>
          { apiKey === '' ? (<ErrorOutlineTwoTone />) : (<AccountCircleTwoTone />) }
        </ListItemIcon>
        <ListItemText
          primary={username === '' ? 'No API key entered yet' : username}
          secondary={username === '' ? 'Click here to add one.' : ''}
          classes={{
            primary: classes.whiteText,
            secondary: classes.whiteSubText,
          }}
        />
      </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
        disableBackdropClick={isApplyingKey}
        disableEscapeKeyDown={isApplyingKey}
      >
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
            error={usernameState.error}
            value={usernameState.value}
            onChange={handleUsernameChange}
            margin="dense"
            id="username"
            label="Username"
            disabled={isApplyingKey}
            fullWidth
            variant="filled"
            helperText={usernameState.error ? API_KEY_DIALOG_MISSING_USERNAME : null}
            FormHelperTextProps={{
              error: usernameState.error
            }}
          />

          <FormControl fullWidth variant="filled" className={classes.filledInput}>
            <InputLabel htmlFor="api-key" margin="dense" error={apiKeyState.error}>TMDb API key</InputLabel>
            <FilledInput
              id="api-key"
              type={apiKeyState.showAPIKey ? 'text' : 'password'}
              value={apiKeyState.value}
              error={apiKeyState.error}
              margin="dense"
              disabled={isApplyingKey}
              onChange={handleAPIKeyChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowAPIKey}
                    onMouseDown={handleMouseDownAPIKey}
                    size="small"
                    disabled={isApplyingKey}
                  >
                    {apiKeyState.showPassword ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {apiKeyState.error && <FormHelperText error={apiKeyState.error} variant="filled" margin="dense">{API_KEY_DIALOG_MISSING_API_KEY}</FormHelperText>}
          </FormControl>

          <DialogContentText className={classes.note}>
            {API_KEY_DIALOG_NOTE}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isApplyingKey}>
            Cancel
          </Button>
          <Button onClick={handleClearForms} color="primary" disabled={isApplyingKey}>
            Clear
          </Button>
          <div className={classes.progressWrapper}>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={isApplyingKey}
            >
              Submit
            </Button>
            { (isApplyingKey) && <CircularProgress size={24} thickness={7} className={classes.buttonProgress} /> }
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}