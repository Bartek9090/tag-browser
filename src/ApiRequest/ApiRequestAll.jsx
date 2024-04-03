import axios from "axios";

async function fetchTags(
  page = 0,
  limit = 100,
  order = "asc",
  sort = "popular"
) {
  page += 1;
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${limit}&order=${order}&sort=${sort}&site=stackoverflow`
    );

    console.log(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${limit}&order=${order}&sort=${sort}&site=stackoverflow`
    );

    const data = response.data.items.map((tag, index) => ({
      id: index,
      name: tag.name,
      popular: tag.count,
    }));

    console.log("fetchTags", data);

    return data;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    throw error;
  }
}

export default fetchTags;
