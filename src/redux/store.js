import { createStore } from "redux";
import WatchlistReducer from "./WatchlistReducer";

const store = createStore(WatchlistReducer);

export default store;
