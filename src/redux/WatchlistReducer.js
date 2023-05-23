import {
  AUTHENTICATE,
  WATCHLIST_REFRESH,
  WATCHLIST_SET_SYMBOL,
  WATCHLIST_UPDATE_SYMBOL,
  WATCHLIST_SET_DATA,
  WATCHLIST_UPDATE_DATA,
} from "./ActionTypes";

const initialState = {
  watchListSymbols: [],
  ltpData: [],
  isAuthenticated: false,
  authToken: undefined,
  lastRefreshed: undefined,
  showSnackBar: false,
};

const WatchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case WATCHLIST_UPDATE_SYMBOL:
      return {
        ...state,
        watchListSymbols: action.payload,
      };

    case WATCHLIST_SET_SYMBOL:
      return {
        ...state,
        watchListSymbols: [...action?.payload],
      };
    case WATCHLIST_REFRESH:
      return {
        ...state,
        ltpData: [...action.payload],
        lastRefreshed: new Date().toString(),
      };
    case AUTHENTICATE:
      return {
        ...state,
        authToken: action.payload,
        isAuthenticated: action.payload !== undefined,
      };
    case WATCHLIST_UPDATE_DATA:
      return {
        ...state,
        ltpData: [...state.ltpData, action.payload],
      };

    case WATCHLIST_SET_DATA:
      return {
        ...state,
        ltpData: [...action?.payload],
      };
    default:
      return state;
  }
};

export default WatchlistReducer;
