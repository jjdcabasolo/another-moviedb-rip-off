// ACTION TYPE
const snackbarActionType = {
  HIDE_SNACKBAR: "@snackbar/HIDE_SNACKBAR",
  SHOW_SNACKBAR: "@snackbar/SHOW_SNACKBAR",
};

// ACTIONS
export const snackbarActions = {
  showSnackbar: (snackbarMessage, variant) => ({
    type: snackbarActionType.SHOW_SNACKBAR,
    payload: { snackbarMessage, variant },
  }),
  hideSnackbar: () => ({
    type: snackbarActionType.HIDE_SNACKBAR,
  }),
};

// REDUCER
const initialState = {
  snackbarMessage: "",
  variant: "success",
  isShown: false,
};

const showSnackbar = (state, action) => ({
  ...state,
  isShown: true,
  variant: action.payload.variant,
  snackbarMessage: action.payload.snackbarMessage,
});

const hideSnackbar = (state) => ({
  ...state,
  isShown: false,
});

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case snackbarActionType.HIDE_SNACKBAR:
      return hideSnackbar(state);
    case snackbarActionType.SHOW_SNACKBAR:
      return showSnackbar(state, action);
    default:
      return state;
  }
};
