import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddSymbolDialog from "./AddSymbolDialog";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const DataTable = (props) => {
  //should be memoized or stable
  const [showAddDialog, setShowAddDialog] = useState("CLOSE");

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "tradingsymbol", //access nested data with dot notation
        header: "Symbol",
        size: 100,
      },
      {
        accessorKey: "firstSeen",
        header: "Added @",
      },
      {
        accessorKey: "ltp",
        header: "LTP",
      },
      {
        accessorKey: "change",
        header: "Change",
        Cell: ({ renderedCellValue }) => (
          <strong
            style={
              renderedCellValue > 0 ? { color: "green" } : { color: "red" }
            }
          >
            {renderedCellValue}
          </strong>
        ),
      },
      {
        accessorKey: "target1",
        header: "Target1",
      },
      {
        accessorKey: "support1",
        header: "Support1",
      },
      {
        accessorKey: "low", //normal accessorKey
        header: "Low",
      },
      {
        accessorKey: "high",
        header: "High",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
    ],
    []
  );

  // console.log("DATA_TABLE_DATA: " + JSON.stringify(state.ltpData));
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={state.ltpData}
        enablePinning
        initialState={{
          columnPinning: { left: ["tradingsymbol"] },
          density: "compact",
        }}
        defaultColumn={{
          minSize: 50, //allow columns to get smaller than default
          maxSize: 150, //allow columns to get larger than default
          size: 50, //make columns wider by default
        }}
        enableColumnResizing
        layoutMode="grid"
        renderTopToolbarCustomActions={({ table }) => {
          const handleContact = () => {
            setShowAddDialog("SHOW");
            // table.getSelectedRowModel().flatRows.map((row) => {
            //   alert("contact " + row.getValue("name"));
            // });
          };

          return (
            <Box
              sx={{ display: "flex", gap: "1rem", p: "4px", float: "right" }}
            >
              <Button
                color="info"
                // disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="secondary"
              >
                Add Symbol
              </Button>
            </Box>
          );
        }}
      />
      <AddSymbolDialog
        open={showAddDialog === "SHOW"}
        setShowAddDialog={setShowAddDialog}
        refreshData={props.refreshData}
        watchList={props.watchList}
      />
    </>
  );
};

export default DataTable;
