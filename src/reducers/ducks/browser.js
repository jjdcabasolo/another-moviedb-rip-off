// ACTION TYPE
const browserActionType = {
  CHANGE_BROWSER_SIZE: '@browser/CHANGE_BROWSER_SIZE',
};

// ACTIONS
export const browserActions = {
  changeBrowserSize: (height, width) => ({
    type: browserActionType.CHANGE_BROWSER_SIZE,
    payload: { height, width },
  }),
};

// REDUCER
const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  scrollY: window.pageYOffset,
};

const changeBrowserSize = (state, action) => ({
  ...state,
  height: action.payload.height,
  width: action.payload.width,
});

export const browserReducer = (state = initialState, action) => {
  switch (action.type) {
    case browserActionType.CHANGE_BROWSER_SIZE: return changeBrowserSize(state, action);
    default: return state;
  }
};
