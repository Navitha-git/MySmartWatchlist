import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import AddSymbolDialog from "./AddSymbolDialog";
import { useState } from "react";

const DataTable = (props) => {
  //should be memoized or stable
  const [showAddDialog, setShowAddDialog] = useState("CLOSE");
  const columns = useMemo(
    () => [
      {
        accessorKey: "tradingsymbol", //access nested data with dot notation
        header: "Symbol",
      },
      {
        accessorKey: "date",
        header: "Date",
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
          <strong style={renderedCellValue > 0 ? {} : { color: "red" }}>
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
    ],
    []
  );

  console.log("DATA_TABLE_DATA: " + JSON.stringify(props.data));
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={props.data}
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
                Add
              </Button>
            </div>
          );
        }}
      />
      <AddSymbolDialog
        open={showAddDialog === "SHOW"}
        setShowAddDialog={setShowAddDialog}
      />
    </>
  );
};

export default DataTable;
