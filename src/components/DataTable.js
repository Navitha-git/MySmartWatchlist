import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
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
        size: 30,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 20,
      },
      {
        accessorKey: "firstSeen",
        header: "Added @",
        size: 10,
      },
      {
        accessorKey: "ltp",
        header: "LTP",
        size: 10,
      },
      {
        accessorKey: "change",
        header: "Change",
        size: 10,
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
        size: 10,
      },
      {
        accessorKey: "support1",
        header: "Support1",
        size: 10,
      },
      {
        accessorKey: "low", //normal accessorKey
        header: "Low",
        size: 10,
      },
      {
        accessorKey: "high",
        header: "High",
        size: 10,
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
            <div style={{ display: "flex", gap: "0.5rem", align: "right" }}>
              <Button
                color="info"
                // disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="secondary"
              >
                Add Symbol
              </Button>
            </div>
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
