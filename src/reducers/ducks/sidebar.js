// ACTION TYPE
const sidebarActionType = {
  INCREMENT_SEE_MORE: '@sidebar/INCREMENT_SEE_MORE',
  SET_ACTIVE_TAB: '@sidebar/SET_ACTIVE_TAB',
  SET_DRAWER: '@sidebar/SET_DRAWER',
  SET_ITEM_DRAWER: '@sidebar/SET_ITEM_DRAWER',
  SET_SEARCH: '@sidebar/SET_SEARCH',
  SET_SEARCH_QUERY: '@sidebar/SET_SEARCH_QUERY',
  TOGGLE_DRAWER: '@sidebar/TOGGLE_DRAWER',
  TOGGLE_LIGHTS: '@sidebar/TOGGLE_LIGHTS',
};

// ACTIONS
export const sidebarActions = {
  toggleDrawer: () => ({
    type: sidebarActionType.TOGGLE_DRAWER,
  }),
  toggleLights: () => ({
    type: sidebarActionType.TOGGLE_LIGHTS,
  }),
  setActiveTab: (tab) => ({
    type: sidebarActionType.SET_ACTIVE_TAB,
    payload: { tab },
  }),
  setDrawer: (drawerOpen) => ({
    type: sidebarActionType.SET_DRAWER,
    payload: { drawerOpen },
  }),
  setItemDrawer: (itemDrawerOpen) => ({
    type: sidebarActionType.SET_ITEM_DRAWER,
    payload: { itemDrawerOpen },
  }),
  setSearchQuery: (searchQuery) => ({
    type: sidebarActionType.SET_SEARCH_QUERY,
    payload: { searchQuery },
  }),
  setSearch: (isSearchOpen) => ({
    type: sidebarActionType.SET_SEARCH,
    payload: { isSearchOpen },
  }),
};

// REDUCER
const evaluateInitialTab = () => {
  const initialTab = window.location.hash.replace('#/', '');

  if (initialTab === '') return 'movies';
  if (initialTab.toLowerCase().includes('movies')) return 'movies';
  return 'tvshows';
};

const initialState = {
  activeTab: evaluateInitialTab(),
  darkMode: localStorage.getItem('darkMode') === 'true',
  drawerOpen: false,
  isSearchOpen: false,
  itemDrawerOpen: true,
  searchQuery: '',
};

const setActiveTab = (state, action) => ({
  ...state,
  activeTab: action.payload.tab,
  isSearchOpen: false,
});

const toggleDrawer = (state) => ({
  ...state,
  drawerOpen: !state.drawerOpen,
});

const toggleLights = (state) => {
  if (state.darkMode) localStorage.setItem('darkMode', 'false');
  else localStorage.setItem('darkMode', 'true');

  return ({
    ...state,
    darkMode: !state.darkMode,
  });
};

const setDrawer = (state, action) => ({
  ...state,
  drawerOpen: action.payload.drawerOpen,
});

const setItemDrawer = (state, action) => ({
  ...state,
  itemDrawerOpen: action.payload.itemDrawerOpen,
});

const setSearchQuery = (state, action) => ({
  ...state,
  searchQuery: action.payload.searchQuery,
});

const setSearch = (state, action) => ({
  ...state,
  isSearchOpen: action.payload.isSearchOpen,
});

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case sidebarActionType.SET_ACTIVE_TAB: return setActiveTab(state, action);
    case sidebarActionType.SET_DRAWER: return setDrawer(state, action);
    case sidebarActionType.SET_ITEM_DRAWER: return setItemDrawer(state, action);
    case sidebarActionType.SET_SEARCH: return setSearch(state, action);
    case sidebarActionType.SET_SEARCH_QUERY: return setSearchQuery(state, action);
    case sidebarActionType.TOGGLE_DRAWER: return toggleDrawer(state);
    case sidebarActionType.TOGGLE_LIGHTS: return toggleLights(state);
    default: return state;
  }
};
