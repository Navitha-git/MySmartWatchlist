import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import WATCHLIST_META_DATA from "../utils/WatchlistMetaData.json";
// import { saveAs } from "file-saver";
// import { doc, setDoc } from "firebase/firestore";
// import { fireStoreDb } from "../utils/firebase";
import { setFirebaseDoc } from "../services/FireBaseService";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  watchlistAddSymbol,
  watchlistGetSymbols,
  watchlistRefresh,
  authenticate,
} from "../redux/WatchlistActions";

export default function AddSymbolDialog(props) {
  const [exhange, setExchange] = React.useState();
  const [symboltoken, setSymboltoken] = React.useState();
  const [symbol, setSymbol] = React.useState();
  const [addDate, setAddDate] = React.useState();
  const [firstSeen, setFirstSeen] = React.useState();
  const [target1, setTarget1] = React.useState();
  const [support1, setSupport1] = React.useState();
  const [suggestedby, setSuggestedBy] = React.useState();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setShowAddDialog("CLOSE");
  };

  const handleSaveSymbol = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log("DATA_SYMBOL:" + JSON.stringify(data));
    const formData = {
      exchange: exhange,
      tradingsymbol: symbol,
      symboltoken: symboltoken,
      metadata: {
        date: addDate,
        firstSeen: firstSeen,
        target1: target1,
        support1: support1,
        suggestedby: suggestedby,
      },
    };

    console.log(
      "NEW_WATCH_LIST:" +
        JSON.stringify([...state.watchListSymbols, { ...formData }])
    );
    // await setDoc(doc(fireStoreDb, "watchlist", "list1"), {
    //   symbols: [...state.watchListSymbols, { ...formData }],
    // });
    await setFirebaseDoc([...state.watchListSymbols, { ...formData }]);
    // saveAs(
    //   new Blob([JSON.stringify(WATCHLIST_META_DATA)], {
    //     type: "application/json",
    //   }),
    //   "export_watchlist.json"
    // );

    props.setShowAddDialog("CLOSE");
    dispatch(watchlistAddSymbol({ ...formData }));
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        onSubmit={handleSaveSymbol}
      >
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new stock to watchlist.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="exchange"
            label="Exchange"
            type="text"
            fullWidth
            variant="standard"
            value={exhange}
            onChange={(e) => {
              setExchange(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="symboltoken"
            label="Symbol Token"
            type="text"
            fullWidth
            variant="standard"
            value={symboltoken}
            onChange={(e) => {
              setSymboltoken(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="tradingsymbol"
            label="Stock Symbol"
            type="text"
            fullWidth
            variant="standard"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="dateAdded"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            value={addDate}
            onChange={(e) => {
              setAddDate(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="firstseen"
            label="Seen @"
            type="number"
            fullWidth
            variant="standard"
            value={firstSeen}
            onChange={(e) => {
              setFirstSeen(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="target1"
            label="Target"
            type="number"
            fullWidth
            variant="standard"
            value={target1}
            onChange={(e) => {
              setTarget1(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="support1"
            label="Support"
            type="number"
            fullWidth
            variant="standard"
            value={support1}
            onChange={(e) => {
              setSupport1(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="suggestedby"
            label="Suggested By"
            type="text"
            fullWidth
            variant="standard"
            value={suggestedby}
            onChange={(e) => {
              setSuggestedBy(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveSymbol}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
