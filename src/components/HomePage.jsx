import { useState } from "react";
import { Container, Grid } from "@mui/material";
import CustomizedDataTable from "./tableComponent/DataTable";
import Header from "./homeCompoments/Header";
import SearchInput from "./homeCompoments/SearchInput";
import fetchTagData from "../ApiRequest/ApiRequest";
import fetchTags from "../ApiRequest/ApiRequestAll";
const HomePage = () => {
  const [tagData, setTagData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (searchText) => {
    setLoading(true);
    try {
      const data = await fetchTagData(searchText);
      setTagData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllTags = async () => {
    setLoading(true);
    try {
      const data = await fetchTags();
      setTagData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SearchInput onSearch={fetchData} onSearchAll={handleFetchAllTags} />
        </Grid>
      </Grid>
      <CustomizedDataTable
        columns={[
          { field: "name", headerName: "Tag", width: 150, sortable: true },
          {
            field: "popular",
            headerName: "Count",
            type: "number",
            width: 100,
            sortable: true,
          },
        ]}
      />
    </Container>
  );
};

export default HomePage;
