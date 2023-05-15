export const WATCHLIST_COLUMS = [
  {
    accessorKey: "tradingsymbol", //access nested data with dot notation
    header: "Symbol",
  },
  {
    accessorKey: "ltp",
    header: "LTP",
  },
  {
    accessorKey: "low", //normal accessorKey
    header: "Low",
  },
  {
    accessorKey: "high",
    header: "High",
  },
];

export const WATCHLIST_SYMBOLS = [
  {
    exchange: "NSE",
    tradingsymbol: "CONTROLPR-EQ",
    symboltoken: "17477",
    metadata: {
      date: "02/05/2023",
      firstSeen: 579,
      target1: 750,
      support1: 470,
    },
  },
  {
    exchange: "NSE",
    tradingsymbol: "CERA-EQ",
    symboltoken: "15039",
    metadata: {
      date: "11/05/2023",
      firstSeen: 6831,
    },
  },
  {
    exchange: "NSE",
    tradingsymbol: "NEULANDLAB-EQ",
    symboltoken: "2406",
    metadata: {
      date: "11/05/2023",
      firstSeen: 2538,
    },
  },
  {
    exchange: "NSE",
    tradingsymbol: "JSL-EQ",
    symboltoken: "11236",
    metadata: {
      date: "12/05/2023",
      firstSeen: 289,
      support1: 285,
    },
  },
];
