import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { authenticateSmartAPI } from "../services/AuthService";
import { getLTP } from "../services/DataService";
import { getFirebaseWatchlistSymbols } from "../services/FireBaseService";
import Button from "@mui/material/Button";
import "../App.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import SnackBar from "./SnackBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProgressBar from "./ProgressBar";

import { useSelector, useDispatch } from "react-redux";
import {
  watchlistGetSymbols,
  watchlistRefresh,
  authenticate,
} from "../redux/WatchlistActions";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [showSnack, setShowSnack] = useState(false);
  const [loading, setLoading] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const getLTPData = async (symbolData) => {
    const ltpData = [];
    for (let i = 0; i < symbolData.length; i++) {
      const symbol = symbolData[i];
      // console.log("SYMBOL_META: " + JSON.stringify(symbol));
      if (symbol) {
        await getLTP(token, symbol)
          .then((response) => {
            // console.log("LTP_DATA2: " + JSON.stringify(response.data));
            const changePrice =
              response.data?.data.ltp - symbol?.metadata.firstSeen;
            ltpData.push({
              ...response.data?.data,
              ...symbol?.metadata,
              change: changePrice.toFixed(2),
            });
          })
          .catch((error) => {
            console.log("LTP_ERR" + error);
          });
      }
    }
    console.log("LTP_DATA_ALL: " + JSON.stringify(ltpData));
    dispatch(watchlistRefresh(ltpData));
  };

  const fetchLTP = async () => {
    if (token !== "") {
      setLoading(true);
      await getLTPData(state.watchListSymbols);
      setLoading(false);
    } else {
      console.log("NOT AUTHENTICATED");
    }
  };

  const doAuthenticate = async () => {
    getFirebaseWatchlistSymbols(dispatch, watchlistGetSymbols);

    await authenticateSmartAPI()
      .then((response) => {
        console.log("AUTH_SUCC: " + JSON.stringify(response.data));
        setToken(response.data.data.jwtToken);
        dispatch(authenticate(response.data.data.jwtToken));
        setShowSnack(true);
        fetchLTP();
      })
      .catch((error) => {
        console.log("AUTH_ERR" + error);
      });
  };
  // useEffect(() => {
  //   doAuthenticate();
  // }, []);

  return (
    <>
      <AppBar position="static">
        <SnackBar flag={showSnack} setShowSnack={setShowSnack} />
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Smart Watchlist
          </Typography>

          <Button color="inherit" onClick={doAuthenticate}>
            Authenticate
          </Button>
          <Button color="inherit" onClick={fetchLTP}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {state.lastRefreshed && (
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            align="center"
          >
            {state.lastRefreshed}
          </Typography>
        )}
        {loading && <ProgressBar />}
        {state.ltpData && state.ltpData.length > 0 && (
          <DataTable
            refreshData={fetchLTP}
            watchList={state.watchListSymbols}
          />
        )}
      </Box>
    </>
  );
};

export default Dashboard;
