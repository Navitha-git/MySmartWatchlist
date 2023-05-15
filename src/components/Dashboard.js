// import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
// import { fireStoreDb } from "../utils/firebase";
import DataTable from "./DataTable";
import { authenticateSmartAPI } from "../services/AuthService";
import { getLTP } from "../services/DataService";
import Button from "@mui/material/Button";
import "../App.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import SnackBar from "./SnackBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WATCHLIST_META_DATA from "../utils/WatchlistMetaData.json";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [ltp, setLTP] = useState();
  const [showSnack, setShowSnack] = useState(false);
  const [lastRefresh, setLastRefresh] = useState();

  // const fetchPost = async () => {
  //   await getDocs(collection(fireStoreDb, "watchlist")).then(
  //     (querySnapshot) => {
  //       const newData = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setTodos(newData[0].instrument_codes);
  //       console.log("FIRE_BASE_DATA:" + JSON.stringify(newData));
  //       // console.log(querySnapshot);
  //     }
  //   );
  // };

  let timerID;

  const getLTPData = async (symbolData) => {
    const ltpData = [];
    for (let i = 0; i < symbolData.length; i++) {
      await getLTP(token, symbolData[i])
        .then((response) => {
          console.log("LTP_DATA2: " + JSON.stringify(response.data));
          const changePrice =
            response.data?.data.ltp - symbolData[i].metadata.firstSeen;
          ltpData.push({
            ...response.data?.data,
            ...symbolData[i].metadata,
            change: changePrice.toFixed(2),
          });
        })
        .catch((error) => {
          console.log("LTP_ERR" + error);
        });
    }
    console.log("LTP_DATA_ALL: " + JSON.stringify(ltpData));
    setLTP(ltpData);
  };

  const fetchLTP = async () => {
    if (token !== "") {
      // timerID = setInterval(getLTPData(WATCHLIST_META_DATA), 60 * 1000);
      getLTPData(WATCHLIST_META_DATA);
      setLastRefresh(new Date().toString(););
    }
  };

  const doAuthenticate = async () => {
    await authenticateSmartAPI()
      .then((response) => {
        console.log("AUTH_SUCC: " + JSON.stringify(response.data));
        setToken(response.data.data.jwtToken);
        setShowSnack(true);
      })
      .catch((error) => {
        console.log("AUTH_ERR" + error);
      });
  };
  // useEffect(() => {
  //   // fetchPost();
  // }, []);
  const stopRefresh = () => {
    clearInterval(timerID);
  };
  return (
    <>
      <AppBar position="static">
        <SnackBar flag={showSnack} setShowSnack={setShowSnack} />
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smart Watchlist
          </Typography>
          {lastRefresh && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {lastRefresh}
            </Typography>
          )}
          <Button color="inherit" onClick={doAuthenticate}>
            Authenticate
          </Button>
          <Button color="inherit" onClick={fetchLTP}>
            Refresh
          </Button>
          <Button color="inherit" onClick={stopRefresh}>
            Stop Refresh
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {/* <Toolbar /> */}
        {ltp && <DataTable data={ltp} />}
      </Box>
      {/* <header className="App-header"> */}
      {/* <Button variant="contained" onClick={doAuthenticate}>
          Authenticate
        </Button> */}
      {/* <div>{token && <p>{token}</p>}</div> */}
      {/* <Button variant="contained" onClick={fetchLTP}>
          LTP
        </Button> */}
      {/* <div>{ltp && <p>{JSON.stringify(ltp)}</p>}</div> */}
      {/* </header>
      {ltp && <DataTable data={ltp} />} */}
    </>
  );
};

export default Dashboard;
