import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  return (
    <div style={{ height: "650px", width: "200%" }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{
          fontSizeAdjust: "28px",
        }}
      />
    </div>
  );
};

export default DataTable;
