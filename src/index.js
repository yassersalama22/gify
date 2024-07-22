import "./style.css";

document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    const searchQuery = document.getElementById("search-box").value;
    if (searchQuery) {
      const apiKey = "DU5ohdVnWAiXqnTR1FqOF5pr4ddzJI4b";
      const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
        searchQuery
      )}&limit=10`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("API response is not OK");
        }

        const data = await response.json();
        displayGifs(data.data);
      } catch (error) {
        console.error("Fetch operation failed:", error);
      }
    } else {
      alert("Please enter search term");
    }
  });

function displayGifs(gifs) {
  gifs.forEach((gif) => {
    console.log(gif.images.fixed_height.url);
  });
}
