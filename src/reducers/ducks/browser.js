// ACTION TYPE
const browserActionType = {
  CHANGE_BROWSER_SIZE: '@browser/CHANGE_BROWSER_SIZE',
  CHANGE_BROWSER_SCROLL_Y: '@browser/CHANGE_BROWSER_SCROLL_Y',
};

// ACTIONS
export const browserActions = {
  changeBrowserSize: (height, width) => ({
    type: browserActionType.CHANGE_BROWSER_SIZE,
    payload: { height, width },
  }),
  changeBrowserScrollY: scrollY => ({
    type: browserActionType.CHANGE_BROWSER_SCROLL_Y,
    payload: { scrollY },
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

const changeBrowserScrollY = (state, action) => ({
  ...state,
  scrollY: action.payload.scrollY,
});

export const browserReducer = (state = initialState, action) => {
  switch (action.type) {
    case browserActionType.CHANGE_BROWSER_SIZE: return changeBrowserSize(state, action);
    case browserActionType.CHANGE_BROWSER_SCROLL_Y: return changeBrowserScrollY(state, action);
    default: return state;
  }
};
