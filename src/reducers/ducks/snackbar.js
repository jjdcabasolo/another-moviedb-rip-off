// ACTION TYPE
const snackbarActionType = {
  HIDE_SNACKBAR: '@snackbar/hide_snackbar',
  SHOW_SNACKBAR: '@snackbar/show_snackbar',
};

// ACTIONS
export const snackbarActions = {
  showSnackbar: (snackbarName, snackbarMessage) => ({
    type: snackbarActionType.SHOW_SNACKBAR,
    snackbarName,
    snackbarMessage,
  }),

  hideSnackbar: snackbarName => ({
    type: snackbarActionType.HIDE_SNACKBAR,
    snackbarName,
  }),
};

// REDUCER
const initialState = {
  snackbarMessage: '',

  // format: <Action><Case to be Handled>
  addEditBatchCompleteDetails: false,
  addEditBatchIncompleteDetails: false,
  saveDraftCompleteDetails: false,
  saveDraftIncompleteDetails: false,
  updateCourseStatus: false,
  userLogging: false,
};

const showSnackbar = (state, action) => ({
  ...state,
  [action.snackbarName]: true,
  snackbarMessage: action.snackbarMessage,
});

const hideSnackbar = (state, action) => ({
  ...state,
  [action.snackbarName]: false,
});

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case snackbarActionType.HIDE_SNACKBAR: return hideSnackbar(state, action);
    case snackbarActionType.SHOW_SNACKBAR: return showSnackbar(state, action);
    default: return state;
  }
};
