// ACTION TYPE
const tvShowsActionType = {
  SET_ACTIVE_TV_SHOW: '@tvShows/SET_ACTIVE_TV_SHOW',
  SET_CATEGORY: '@tvShows/SET_CATEGORY',
  SET_DETAILS_LOADING: '@tvShows/SET_DETAILS_LOADING',
  SET_EPISODE: '@tvShows/SET_EPISODE',
  SET_SEASON_DRAWER: '@tvShows/SET_SEASON_DRAWER',
  SET_SEASON_DRAWER_SELECTED_SEASON: '@tvShows/SET_SEASON_DRAWER_SELECTED_SEASON',
  SET_SELECTED_EPISODE: '@tvShows/SET_SELECTED_EPISODE',
  SET_SELECTED_SEASON: '@tvShows/SET_SELECTED_SEASON',
  SET_TV_SHOWS_LIST: '@tvShows/SET_TV_SHOWS_LIST',
};

// ACTIONS
export const tvShowsActions = {
  setCategory: (category) => ({
    type: tvShowsActionType.SET_CATEGORY,
    payload: { category },
  }),
  setTVShowsList: (category, list) => ({
    type: tvShowsActionType.SET_TV_SHOWS_LIST,
    payload: { category, list },
  }),
  setActiveTVShow: (tvShow) => ({
    type: tvShowsActionType.SET_ACTIVE_TV_SHOW,
    payload: { tvShow },
  }),
  setDetailsLoading: (isTVShowLoading) => ({
    type: tvShowsActionType.SET_DETAILS_LOADING,
    payload: { isTVShowLoading },
  }),
  setSeasonDrawer: (seasonDrawerOpen) => ({
    type: tvShowsActionType.SET_SEASON_DRAWER,
    payload: { seasonDrawerOpen },
  }),
  setEpisode: (episodes) => ({
    type: tvShowsActionType.SET_EPISODE,
    payload: { episodes },
  }),
  setSelectedSeason: (selectedSeason) => ({
    type: tvShowsActionType.SET_SELECTED_SEASON,
    payload: { selectedSeason },
  }),
  setSelectedEpisode: (selectedEpisode) => ({
    type: tvShowsActionType.SET_SELECTED_EPISODE,
    payload: { selectedEpisode },
  }),
  setSeasonDrawerSelectedSeason: (seasonDrawerIsSeasonSelected) => ({
    type: tvShowsActionType.SET_SEASON_DRAWER_SELECTED_SEASON,
    payload: { seasonDrawerIsSeasonSelected },
  }),
};

// REDUCER
const initialState = {
  category: 'airingToday',
  episodes: [],
  isTVShowLoading: false,
  list: {
    airingToday: [],
    onTheAir: [],
    popular: [],
    topRated: [],
  },
  loadedContent: 0,
  seasonDrawerIsSeasonSelected: true,
  seasonDrawerOpen: false,
  selectedEpisode: 0,
  selectedSeason: 0,
  tvShow: {},
};

const setCategory = (state, action) => ({
  ...state,
  category: action.payload.category,
});

const setTVShowsList = (state, action) => ({
  ...state,
  list: {
    ...state.list,
    [action.payload.category]: action.payload.list,
  },
  loadedContent: state.loadedContent + 1,
});

const setActiveTVShow = (state, action) => {
  const { payload } = action;
  const { tvShow } = payload;
  const { number_of_seasons: seasonCount, seasons } = tvShow;
  let selectedSeason = seasonCount;

  const fallbackSeason = seasons.filter((e) => e.season_number > 0 && e.air_date);

  let latestSeason = seasons.pop();
  selectedSeason = latestSeason.season_number;
  while (!latestSeason.air_date && latestSeason.length > 0) {
    console.log('ur inside while loop');
    latestSeason = seasons.pop();
    selectedSeason = latestSeason.season_number;
  }
  console.log(latestSeason, selectedSeason, seasons);
  // while (seasons[latestSeason].air_date) {
  //   console.log(seasons, latestSeason);
  // }


  // // season not yet released, use the previous season with an air date
  // const season = seasons.filter((e) => e.season_number <= selectedSeason && e.air_date);
  // selectedSeason = season[season.length - 1].season_number;
  // if (selectedSeason >= 0) selectedSeason = 1;

  return {
    ...state,
    tvShow: action.payload.tvShow,
    selectedSeason,
  };
};

const setDetailsLoading = (state, action) => ({
  ...state,
  isTVShowLoading: action.payload.isTVShowLoading,
});

const setSeasonDrawer = (state, action) => ({
  ...state,
  seasonDrawerOpen: action.payload.seasonDrawerOpen,
});

const setEpisode = (state, action) => ({
  ...state,
  episodes: action.payload.episodes,
});

const setSelectedSeason = (state, action) => ({
  ...state,
  selectedSeason: action.payload.selectedSeason,
});

const setSelectedEpisode = (state, action) => ({
  ...state,
  selectedEpisode: action.payload.selectedEpisode,
});

const setSeasonDrawerSelectedSeason = (state, action) => ({
  ...state,
  seasonDrawerIsSeasonSelected: action.payload.seasonDrawerIsSeasonSelected,
});

export const tvShowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvShowsActionType.SET_ACTIVE_TV_SHOW: return setActiveTVShow(state, action);
    case tvShowsActionType.SET_CATEGORY: return setCategory(state, action);
    case tvShowsActionType.SET_DETAILS_LOADING: return setDetailsLoading(state, action);
    case tvShowsActionType.SET_EPISODE: return setEpisode(state, action);
    case tvShowsActionType.SET_SEASON_DRAWER: return setSeasonDrawer(state, action);
    case tvShowsActionType.SET_SEASON_DRAWER_SELECTED_SEASON: return setSeasonDrawerSelectedSeason(state, action);
    case tvShowsActionType.SET_SELECTED_EPISODE: return setSelectedEpisode(state, action);
    case tvShowsActionType.SET_SELECTED_SEASON: return setSelectedSeason(state, action);
    case tvShowsActionType.SET_TV_SHOWS_LIST: return setTVShowsList(state, action);
    default: return state;
  }
};
