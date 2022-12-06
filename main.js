import "./style.css";
// import "../src/input.css";
import { checkTheme } from "/themeSwitcher.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const infoDiv = document.getElementById("info-div");
const infoPar = document.getElementById("info-par");
const movieListDiv = document.getElementById("movie-list-div");

const movieWatchList = [];
let movie;
checkTheme();

searchBtn.addEventListener("click", () => {
  let movieTitle = searchInput.value;

  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=e4b23aff`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response == "True") {
        movie = data;
        renderMovie(movie);
      } else {
        // check if the movie exist and show error message
        movieListDiv.classList.add("hidden");
        infoDiv.classList.remove("hidden");
        infoPar.textContent =
          "Unable to find what you’re looking for. Please try another search.";
      }
    })
    .catch((e) => alert(e));
});

// render movies to html
function renderMovie(data) {
  movieListDiv.classList.remove("hidden");
  infoDiv.classList.add("hidden");
  const { Title, imdbRating, Runtime, Genre, Plot, Poster } = data;

  // render each card
  const movieCard = `<div class="flex h-auto max-h-52 w-full gap-3 dark:text-[#FFFFFF]">
            <!-- Movie Poster -->
            <img
              src="${Poster}"
              alt="No movie poster"
              class="h-full max-h-52 w-28 text-center bg-center rounded-md"
            />

            <!-- Movie details -->
            <div class="flex flex-col w-full h-full gap-2 justify-start py-1">
              <!-- Movie Title -->
              <div class="flex items-center gap-2 pr-3">
                <h2 class="font-semibold tex-sm">${Title}</h2 >
                <p class="text-sm flex">
                  <img
                    src="../reviewStarIcon.png"
                    alt="Review star icon"
                    class="inline mr-1 w-4 h-4"
                  />${imdbRating}
                </p>
              </div>

              <!-- Movie infos  -->
              <div
                class="max-w-[285px] flex justify-between items-center text-xs text-[#111827] pr-4 gap-[3px] dark:text-[#FFFFFF]"
              >
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <a href="/pages/watchlist.html" class="flex" id="add-to-watchlist-btn">
                  <img
                    src="../plusIconCircle.png"
                    id="plus-icon"
                    alt="Plus Icon"
                    class="inline w-4 rounded-full mr-1 "
                  />Watchlist
                </a>
              </div>

              <!-- MOvie discription -->
              <div>
                <p class="text-[#6B7280] dark:text-[#A5A5A5] text-sm h-24 overflow-clip">
                  ${Plot}
                </p>
              </div>
            </div>
        </div>
        <hr class="text-black border-[1.5px] w-full text-lg font-bold my-5  />
        `;

  movieListDiv.innerHTML = movieCard;
  document
    .getElementById("add-to-watchlist-btn")
    .addEventListener("click", addToWatchlistHandler);

  // change remove icon in dark mode
  if (localStorage.theme === "dark") {
    document
      .getElementById("plus-icon")
      .setAttribute("src", "/plusIconWhite.png");
    document
      .getElementById("gallery-icon")
      .setAttribute("src", "/galleryIconDark.png");
  }
}

function addToWatchlistHandler() {
  // get movies from the localstorage
  let movieFromLS = JSON.parse(localStorage.getItem("movies"));
  console.log("movie");

  // check if the movie exist in the watchlist
  if (movieFromLS) {
    // check if the movie exists in the watchlist
    const isTheMovieExistInLS = movieFromLS.findIndex((singleMovie) => {
      return singleMovie.imdbID == movie.imdbID;
    });
    if (isTheMovieExistInLS == -1) {
      movieFromLS.unshift(movie);
      localStorage.setItem("movies", JSON.stringify(movieFromLS));
    }
  } else {
    // if there is no movie in the watchlist
    movieWatchList.push(movie);
    localStorage.setItem("movies", JSON.stringify(movieWatchList));
  }
}
