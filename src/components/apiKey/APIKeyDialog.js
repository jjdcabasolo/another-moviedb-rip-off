import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core';
import {
  AccountCircleTwoTone,
  ErrorOutlineTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
} from '@material-ui/icons';

import { getPopularMovies } from '../../api';

import ResponsiveComponent from '../../utils/components/ResponsiveComponent';

import { sidebarActions, snackbarActions } from '../../reducers/ducks';

import {
  API_KEY_DIALOG_HAS_KEY,
  API_KEY_DIALOG_MISSING_API_KEY,
  API_KEY_DIALOG_MISSING_USERNAME,
  API_KEY_DIALOG_NOTE,
  API_KEY_DIALOG_SUBTITLE,
  API_KEY_DIALOG_TITLE,
  API_KEY_DIALOG_TMDB_API_LINK,
  API_KEY_DIALOG_TMDB_LINK,
} from '../../constants';

const useStyles = makeStyles((theme) => ({
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
  paper: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
    },
  },
}));

const initState = {
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

  const apiKey = useSelector((state) => state.sidebar.apiKey);
  const username = useSelector((state) => state.sidebar.username);
  const hasApiKey = apiKey.length > 0 && username.length > 0;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(!hasApiKey);
  const [isApplyingKey, setIsApplyingKey] = useState(initState.isApplyingKey);
  const [apiKeyState, setApiKeyState] = useState(initState.apiKey);
  const [usernameState, setUsernameState] = useState(initState.username);

  useEffect(() => {
    setApiKeyState({ ...apiKeyState, value: apiKey });
    setUsernameState({ ...usernameState, value: username });
  }, [username]);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setIsApplyingKey(initState.isApplyingKey);
    setUsernameState({ ...usernameState, error: false });
    setApiKeyState({ ...apiKeyState, error: false });
  };

  const handleAPIKeyChange = (e) => setApiKeyState({
    ...apiKeyState,
    value: e.target.value,
  });

  const handleUsernameChange = (e) => setUsernameState({
    ...usernameState,
    value: e.target.value,
  });

  const handleClickShowAPIKey = () => setApiKeyState({
    ...apiKeyState,
    showAPIKey: !apiKeyState.showAPIKey,
  });

  const handleMouseDownAPIKey = (e) => e.preventDefault();

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
    if (hasApiKey) {
      dispatch(snackbarActions.showSnackbar('Your API key has been cleared!', 'success'));
      dispatch(sidebarActions.clearAPIKey());
      setTimeout(() => dispatch({ type: 'CLEAR_REDUX_STATES' }), 1500);
    } else {
      setUsernameState({ ...usernameState, value: '' });
      setApiKeyState({ ...apiKeyState, value: '' });
    }
  };

  const renderListItem = () => (
    <ListItem button onClick={handleClickOpen}>
      <ListItemIcon>
        { apiKey === '' ? (<ErrorOutlineTwoTone />) : (<AccountCircleTwoTone />) }
      </ListItemIcon>
      <ListItemText
        primary={username === '' ? 'No API key entered yet' : username}
        secondary={username === '' ? 'Click here to add one.' : ''}
      />
    </ListItem>
  );

  const renderIconButton = () => (
    <IconButton onClick={handleClickOpen}>
      { apiKey === '' ? (<ErrorOutlineTwoTone />) : (<AccountCircleTwoTone />) }
    </IconButton>
  );

  return (
    <>
      <ResponsiveComponent
        mobileComponent={renderIconButton()}
        tabletComponent={renderListItem()}
        desktopComponent={renderListItem()}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
        disableBackdropClick={isApplyingKey}
        disableEscapeKeyDown={isApplyingKey}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="form-dialog-title">
          {API_KEY_DIALOG_TITLE}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {API_KEY_DIALOG_SUBTITLE}
            <Link href={API_KEY_DIALOG_TMDB_API_LINK}>
              Learn more
            </Link>
            {'.'}
          </DialogContentText>
          <TextField
            autoFocus
            error={usernameState.error}
            value={usernameState.value}
            onChange={handleUsernameChange}
            margin="dense"
            id="username"
            label="Username"
            disabled={isApplyingKey || hasApiKey}
            fullWidth
            variant="filled"
            helperText={usernameState.error ? API_KEY_DIALOG_MISSING_USERNAME : null}
            FormHelperTextProps={{
              error: usernameState.error,
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
              disabled={isApplyingKey || hasApiKey}
              onChange={handleAPIKeyChange}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowAPIKey}
                    onMouseDown={handleMouseDownAPIKey}
                    size="small"
                    disabled={isApplyingKey || hasApiKey}
                  >
                    {apiKeyState.showAPIKey ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
                  </IconButton>
                </InputAdornment>
              )}
            />
            {apiKeyState.error && <FormHelperText error={apiKeyState.error} variant="filled" margin="dense">{API_KEY_DIALOG_MISSING_API_KEY}</FormHelperText>}
          </FormControl>

          <DialogContentText className={classes.note}>
            {hasApiKey
              ? (
                <>
                  {API_KEY_DIALOG_HAS_KEY}
                  <Link href={API_KEY_DIALOG_TMDB_LINK}>
                    The Movie Database
                  </Link>
                  {'.'}
                </>
              )
              : API_KEY_DIALOG_NOTE}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isApplyingKey}>
            Cancel
          </Button>
          <Button onClick={handleClearForms} color="primary" disabled={isApplyingKey}>
            Clear
          </Button>
          { !hasApiKey && (
            <div className={classes.progressWrapper}>
              <Button
                onClick={handleSubmit}
                color="primary"
                disabled={isApplyingKey}
              >
                Submit
              </Button>
              { (isApplyingKey)
                && <CircularProgress size={24} thickness={7} className={classes.buttonProgress} /> }
            </div>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
