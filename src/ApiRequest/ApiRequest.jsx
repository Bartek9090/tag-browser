import axios from "axios";

async function fetchTagData(searchText) {
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/tags/${searchText}/info?site=stackoverflow`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchTagData;
