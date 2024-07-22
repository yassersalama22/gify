import "./style.css";

// Function to handle search button click
const handleSearch = async () => {
  const searchQuery = document.getElementById("search-box").value.trim();
  if (searchQuery) {
    const apiKey = process.env.GIPHY_API_KEY;
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
      searchQuery
    )}&limit=10`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("API response is not OK");
      }

      const { data: gifs } = await response.json();
      renderGifResults(gifs);
    } catch (error) {
      console.error("Fetch operation failed:", error);
    }
  } else {
    alert("Please enter a search term");
  }
};

// Function to display GIF results
const renderGifResults = (gifs) => {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (gifs.length > 0) {
    gifs.forEach(({ images, title }) => {
      const gifItem = document.createElement("div");
      gifItem.className = "gif-item";
      gifItem.innerHTML = `<img src="${images.fixed_height.url}" alt="${title}">`;
      resultsContainer.appendChild(gifItem);
    });
  } else {
    resultsContainer.innerHTML = '<p id="no-results">No results found</p>';
  }
};

// Event listener for search button
document
  .getElementById("search-button")
  .addEventListener("click", handleSearch);
