import { encrypt, decrypt } from '../../utils/functions/encrypt';

// ACTION TYPE
const sidebarActionType = {
  CLEAR_API_KEY: '@sidebar/CLEAR_API_KEY',
  SET_ACTIVE_TAB: '@sidebar/SET_ACTIVE_TAB',
  SET_API_KEY: '@sidebar/SET_API_KEY',
  SET_DRAWER: '@sidebar/SET_DRAWER',
  TOGGLE_DRAWER: '@sidebar/TOGGLE_DRAWER',
  TOGGLE_LIGHTS: '@sidebar/TOGGLE_LIGHTS',
};

// ACTIONS
export const sidebarActions = {
  clearAPIKey: () => ({
    type: sidebarActionType.CLEAR_API_KEY,
  }),

  toggleDrawer: () => ({
    type: sidebarActionType.TOGGLE_DRAWER,
  }),

  toggleLights: () => ({
    type: sidebarActionType.TOGGLE_LIGHTS,
  }),

  setActiveTab: tab => ({
    type: sidebarActionType.SET_ACTIVE_TAB,
    payload: { tab },
  }),

  setAPIKey: (apiKey, username) => ({
    type: sidebarActionType.SET_API_KEY,
    payload: { apiKey, username },
  }),

  setDrawer: drawerOpen => ({
    type: sidebarActionType.SET_DRAWER,
    payload: { drawerOpen },
  }),
};

// REDUCER
const evaluateInitialTab = () => {
  const initialTab = window.location.hash.replace('#/', '');

  if (initialTab === '') return 'movies';
  if (initialTab.toLowerCase().includes('movies')) return 'movies';
  return 'tvshows';
};

const initialApiKey = localStorage.getItem('apiKey') || '';
const initialUsername = localStorage.getItem('username') || '';

const initialState = {
  activeTab: evaluateInitialTab(),
  apiKey: initialApiKey,
  darkMode: localStorage.getItem('darkMode') === 'true',
  drawerOpen: false,
  username: decrypt(initialUsername, initialApiKey),
};

const setActiveTab = (state, action) => ({
  ...state,
  activeTab: action.payload.tab,
});

const setAPIKey = (state, action) => {
  const apiKey = encrypt(action.payload.apiKey, action.payload.username);
  const username = encrypt(action.payload.username, apiKey);

  localStorage.setItem('apiKey', apiKey);
  localStorage.setItem('username', username);

  return ({
    ...state,
    apiKey: apiKey,
    username: action.payload.username,
  });
};

const toggleDrawer = state => ({
  ...state,
  drawerOpen: !state.drawerOpen,
});

const toggleLights = state => {
  if (state.darkMode) localStorage.setItem('darkMode', 'false');
  else localStorage.setItem('darkMode', 'true');

  return ({
    ...state,
    darkMode: !state.darkMode,
  });
};

const clearAPIKey = state => {
  localStorage.removeItem('apiKey');
  localStorage.removeItem('username');

  return ({
    ...state,
    apiKey: '',
    username: '',
  });
};

const setDrawer = (state, action) => ({
  ...state,
  drawerOpen: action.payload.drawerOpen,
});

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case sidebarActionType.CLEAR_API_KEY: return clearAPIKey(state, action);
    case sidebarActionType.SET_ACTIVE_TAB: return setActiveTab(state, action);
    case sidebarActionType.SET_API_KEY: return setAPIKey(state, action);
    case sidebarActionType.SET_DRAWER: return setDrawer(state, action);
    case sidebarActionType.TOGGLE_DRAWER: return toggleDrawer(state);
    case sidebarActionType.TOGGLE_LIGHTS: return toggleLights(state);
    default: return state;
  }
};
