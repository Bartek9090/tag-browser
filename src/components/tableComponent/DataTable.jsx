import React, { useState, useEffect } from "react";
import fetchTags from "../../ApiRequest/ApiRequestAll";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { TextField, Container } from "@mui/material";
import "../../App.css";
import "./dataTableStyle.css";
export default function CustomizedDataTable({ columns }) {
  const defaultSortConfig = { field: "name", sort: "asc" };
  const [rowCount, setRowCount] = useState(-1);
  const [dataRows, setDataRows] = useState([]);
  const [rowCountFromApi, setRowCountFromApi] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCountState, setRowCountState] = useState(rowCount);
  const [sortConfig, setSortConfig] = useState([defaultSortConfig]);

  const dataSource = {
    getRows: async () => {
      console.log("dataSource", { pagination, sortConfig });

      if (sortConfig.length === 0) {
        sortConfig[0] = defaultSortConfig;
      }

      const data = await fetchTags(
        pagination.page,
        pagination.pageSize,
        sortConfig[0].sort,
        sortConfig[0].field
      );

      return {
        data,
        rows: data,
        rowCount: data.length,
      };
    },
  };

  async function doRefreshData() {
    const data = await dataSource.getRows();
    if (data !== null) {
      setDataRows(data.rows);
      setRowCountState(data.rowCount);
    } else {
      setDataRows([]);
      setRowCountState(-1);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await doRefreshData();
      try {
        const response = await fetch(
          "https://api.stackexchange.com/2.3/tags?filter=total&site=stackoverflow"
        );
        const data = await response.json();
        setRowCountFromApi(data.total);
      } catch (error) {
        console.error(
          "Error retrieving incorrect amount of rows from the API:",
          error
        );
      }
    }

    fetchData();
  }, [sortConfig, pagination]);

  const handlePageSizeChange = (newPageSize) => {
    if (newPageSize > 99) {
      newPageSize = 99;
    }
    setPagination({
      page: pagination.page,
      pageSize: newPageSize,
    });
  };
  return (
    <Container className="dataTableContainer">
      <TextField
        label="Rows per page"
        type="number"
        variant="filled"
        value={pagination.rowCount}
        defaultValue={10}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value) && value > 0) {
            if (value > 100) {
              alert("Value can not be higher then 99");
              return;
            }
            handlePageSizeChange(value);
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: { min: 1, max: 100 },
        }}
      />
      <DataGrid
        className="dataGrideStle"
        columns={[
          {
            field: columns[0].field,
            headerName: columns[0].headerName,
            flex: 1,
          },
          {
            field: columns[1].field,
            headerName: columns[1].headerName,
            flex: 1,
          },
          ...columns.slice(2),
        ]}
        rows={dataRows}
        sortingMode="server"
        filterMode="server"
        paginationMode="server"
        disableColumnFilter
        paginationModel={pagination}
        rowCount={rowCountFromApi}
        onPageSizeChange={handlePageSizeChange}
        onPaginationModelChange={(paginationConfig) => {
          console.log(paginationConfig);
          setPagination(paginationConfig);
        }}
        onSortModelChange={(listOfSortingObjects) => {
          setSortConfig(listOfSortingObjects);
        }}
        pageSizeOptions={[10]}
        sx={{
          color: "white",
        }}
      />
    </Container>
  );
}
