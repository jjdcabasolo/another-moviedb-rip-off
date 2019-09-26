import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomSnackbar from '../components/common/CustomSnackbar.js';

import { snackbarActions } from '../reducers/ducks/snackbar';

const Snackbars = () => {
  const addEditBatchCompleteDetails = useSelector(state => state.snackbar.addEditBatchCompleteDetails);
  const addEditBatchIncompleteDetails = useSelector(state => state.snackbar.addEditBatchIncompleteDetails);
  const saveDraftCompleteDetails = useSelector(state => state.snackbar.saveDraftCompleteDetails);
  const saveDraftIncompleteDetails = useSelector(state => state.snackbar.saveDraftIncompleteDetails);
  const snackbarMessage = useSelector(state => state.snackbar.snackbarMessage);
  const updateCourseStatus = useSelector(state => state.snackbar.updateCourseStatus);
  const userLogging = useSelector(state => state.snackbar.userLogging);

  const dispatch = useDispatch();

  return (
    <>
      {/* add/edit course snackbars */}
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar('addEditBatchCompleteDetails'))}
        isOpen={addEditBatchCompleteDetails}
        message={snackbarMessage}
        variant="success"
      />
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar('addEditBatchIncompleteDetails'))}
        isOpen={addEditBatchIncompleteDetails}
        message={snackbarMessage}
        variant="error"
      />
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar('saveDraftCompleteDetails'))}
        isOpen={saveDraftCompleteDetails}
        message={snackbarMessage}
        variant="success"
      />
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar('saveDraftIncompleteDetails'))}
        isOpen={saveDraftIncompleteDetails}
        message={snackbarMessage}
        variant="error"
      />

      {/* login/out snackbars */}
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar('userLogging'))}
        isOpen={userLogging}
        message={snackbarMessage}
        variant="success"
      />

      {/* course action snackbars */}
      <CustomSnackbar
        handleOnClose={() => dispatch(snackbarActions.hideSnackbar('updateCourseStatus'))}
        isOpen={updateCourseStatus}
        message={snackbarMessage}
        variant="success"
      />
    </>
  );
};

export default Snackbars;
