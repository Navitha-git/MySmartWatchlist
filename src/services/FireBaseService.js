import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "../utils/firebase";

export const getFirebaseWatchlistSymbols = async (
  dispatch,
  watchlistGetSymbols
) => {
  await getDocs(collection(fireStoreDb, "watchlist")).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("DS_FIRE_BASE_DATA:" + JSON.stringify(newData[0].symbols));
    if (newData) dispatch(watchlistGetSymbols(newData[0].symbols));
  });
};

export const setFirebaseDoc = async (data) => {
  await setDoc(doc(fireStoreDb, "watchlist", "list1"), {
    symbols: data,
  });
};
