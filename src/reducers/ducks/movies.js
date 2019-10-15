// ACTION TYPE
const moviesActionType = {
  CLEAR_API_KEY: '@movies/CLEAR_API_KEY',
};

// ACTIONS
export const moviesActions = {
  clearAPIKey: () => ({
    type: moviesActionType.CLEAR_API_KEY,
  }),
};

// REDUCER
const initialState = {

};

const clearAPIKey = state => {

  return ({

  });
}

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActionType.CLEAR_API_KEY: return clearAPIKey(state, action);
    default: return state;
  }
};
