import {
  AUTHENTICATE,
  WATCHLIST_REFRESH,
  WATCHLIST_UPDATE_SYMBOL,
  WATCHLIST_SET_SYMBOL,
  WATCHLIST_UPDATE_DATA,
  WATCHLIST_SET_DATA,
} from "./ActionTypes";

const watchlistAddSymbol = (data) => {
  return {
    type: WATCHLIST_UPDATE_SYMBOL,
    payload: { ...data },
  };
};

const watchlistGetSymbols = (data) => {
  return {
    type: WATCHLIST_SET_SYMBOL,
    payload: data,
  };
};
const watchlistRefresh = (ltpData) => {
  return {
    type: WATCHLIST_REFRESH,
    payload: ltpData,
  };
};
const authenticate = (token) => {
  return {
    type: AUTHENTICATE,
    payload: token,
  };
};

const watchlistUpdateData = (data) => {
  return {
    type: WATCHLIST_UPDATE_DATA,
    payload: { ...data },
  };
};
const watchlistSetData = (data) => {
  return {
    type: WATCHLIST_SET_DATA,
    payload: { ...data },
  };
};
export {
  watchlistAddSymbol,
  watchlistGetSymbols,
  watchlistRefresh,
  authenticate,
  watchlistUpdateData,
  watchlistSetData,
};
