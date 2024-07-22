const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { query } = JSON.parse(event.body);
  const apiKey = process.env.GIPHY_API_KEY;
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
    query
  )}&limit=10`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
