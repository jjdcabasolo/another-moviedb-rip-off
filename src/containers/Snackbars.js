import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomSnackbar from '../components/common/CustomSnackbar.js';

import { snackbarActions } from '../reducers/ducks';

const Snackbars = () => {
  const isShown = useSelector(state => state.snackbar.isShown);
  const variant = useSelector(state => state.snackbar.variant);
  const snackbarMessage = useSelector(state => state.snackbar.snackbarMessage);

  const dispatch = useDispatch();

  return (
    <>
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar(isShown))}
        isOpen={isShown}
        message={snackbarMessage}
        variant={variant}
      />
    </>
  );
};

export default Snackbars;
