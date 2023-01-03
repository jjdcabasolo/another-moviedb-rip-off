// ACTION TYPE
const tmdbConfigActionType = {
  SET_COUNTRY_CONFIG: "@tmdbConfig/SET_COUNTRY_CONFIG",
};

// ACTIONS
export const tmdbConfigActions = {
  setCountryConfig: (countryConfig) => ({
    type: tmdbConfigActionType.SET_COUNTRY_CONFIG,
    payload: { countryConfig },
  }),
};

// REDUCER
const initialState = {
  countryConfig: [],
};

const setCountryConfig = (state, action) => ({
  ...state,
  countryConfig: action.payload.countryConfig,
});

export const tmdbConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case tmdbConfigActionType.SET_COUNTRY_CONFIG:
      return setCountryConfig(state, action);
    default:
      return state;
  }
};
