import { useState } from "react";
import { TextField, Button, Container, CircularProgress } from "@mui/material";
import fetchTagData from "../../ApiRequest/ApiRequest";
import "./SearchInputStyle.css";

const SearchInput = ({ onSearchAll }) => {
  const [searchText, setSearchText] = useState("");
  const [tagData, setTagData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchTextChange = (event) => {
    const value = event.target.value.trim();
    setSearchText(value);
    if (value.length === 0) {
      setError("Value must be greater than one.");
    } else {
      setError("");
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchText.trim().length === 0) {
      setError("Value must be greater than one.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchTagData(searchText);
      setTagData(data);
      if (data.length === 0) {
        setError("No data available for this query");
      } else {
        setError("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllTags = async () => {
    setLoading(true);
    try {
      const data = await onSearchAll();
      setTagData(data);
      setSearchText("");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        color: "white",
        textAlign: "center",
        marginBottom: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <TextField
          className="textField"
          label="Place for your tag"
          variant="filled"
          value={searchText}
          onChange={handleSearchTextChange}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
          size="large"
        />
        <div className="btnContainer">
          <Button type="submit" className="buttonSearch">
            Search
          </Button>
          <Button className="buttonSearch" onClick={handleFetchAllTags}>
            Fetch All Tags
          </Button>
        </div>
      </form>

      {loading && <CircularProgress sx={{ margin: "1rem" }} />}
      {tagData && Array.isArray(tagData) && tagData.length > 0 ? (
        <div className="tagContainer">
          {tagData.map((tag, index) => (
            <div className="tagRow" key={index}>
              <p className="tag">Tag: {tag.name}</p>
              <p className="count">Count: {tag.count}</p>
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default SearchInput;
