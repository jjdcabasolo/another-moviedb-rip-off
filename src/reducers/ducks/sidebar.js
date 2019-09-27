// ACTION TYPE
const sidebarActionType = {
  SET_ACTIVE_TAB: '@sidebar/set_active_tab',
  SET_API_KEY: '@sidebar/set_api_key',
  TOGGLE_DRAWER: '@sidebar/toggle_drawer',
  TOGGLE_LIGHTS: '@sidebar/toggle_lights',
};

// ACTIONS
export const sidebarActions = {
  toggleDrawer: () => (
    async (dispatch, getState) => {
      const { drawerOpen } = getState().sidebar;
      if (drawerOpen) {
        localStorage.setItem('drawerOpen', 'false');
      } else {
        localStorage.setItem('drawerOpen', 'true');
      }
      dispatch({ type: sidebarActionType.TOGGLE_DRAWER });
    }
  ),

  toggleLights: () => (
    async (dispatch, getState) => {
      const { darkMode } = getState().sidebar;
      if (darkMode) {
        localStorage.setItem('darkMode', 'false');
      } else {
        localStorage.setItem('darkMode', 'true');
      }
      dispatch({ type: sidebarActionType.TOGGLE_LIGHTS });
    }
  ),

  setActiveTab: tab => ({
    type: sidebarActionType.SET_ACTIVE_TAB,
    payload: { tab },
  }),

  setAPIKey: (apiKey, username) => ({
    type: sidebarActionType.SET_API_KEY,
    payload: { apiKey, username },
  })
};

// REDUCER
const initialTab = window.location.pathname.replace('/', '');

const initialState = {
  activeTab: initialTab === '' ? 'calendar' : initialTab,
  apiKey: '',
  darkMode: localStorage.getItem('darkMode') === 'true',
  drawerOpen: localStorage.getItem('drawerOpen') === 'true',
  username: '',
};

const setActiveTab = (state, action) => ({
  ...state,
  activeTab: action.payload.tab,
});

const setAPIKey = (state, action) => ({
  ...state,
  apiKey: action.payload.apiKey,
  username: action.payload.username,
});

const toggleDrawer = state => ({
  ...state,
  drawerOpen: !state.drawerOpen,
});

const toggleLights = state => ({
  ...state,
  darkMode: !state.darkMode,
});

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case sidebarActionType.SET_ACTIVE_TAB: return setActiveTab(state, action);
    case sidebarActionType.SET_API_KEY: return setAPIKey(state, action);
    case sidebarActionType.TOGGLE_DRAWER: return toggleDrawer(state);
    case sidebarActionType.TOGGLE_LIGHTS: return toggleLights(state);
    default: return state;
  }
};
