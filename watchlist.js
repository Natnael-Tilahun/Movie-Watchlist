// import "./input.css";
import "./style.css";
import { checkTheme } from "./themeSwitcher.js";
const infoDiv = document.getElementById("info-div");
const movieListDiv = document.getElementById("movie-list-div");
let myWatchlist = JSON.parse(localStorage.getItem("movies"));

checkTheme();

// check if there is movie in the watchlist
if (myWatchlist) {
  infoDiv.style.display = "none";
  render();
}

// render each movie to html
function render() {
  myWatchlist.map((movie) => {
    const { Title, imdbRating, Runtime, Genre, Plot, Poster, imdbID } = movie;

    //   render each card to html
    const movieCard = `
      <div class="flex h-auto max-h-52 w-full gap-3 dark:text-white">
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
                    src="/reviewStarIcon.png"
                    alt="Review star icon"
                    class="inline mr-1 w-4 h-4"
                  />${imdbRating}
                </p>
              </div>

              <!-- Movie infos  -->
              <div
                class="max-w-[285px] flex justify-between items-center text-xs text-[#111827] pr-4 gap-[3px] dark:text-white"
              >
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <a href="./watchlist.html" class="remove-from-watchlist-btn flex" id="remove-from-watchlist-btn" data-id = "${imdbID}" >
                  <img
                    src="/minusIconCircle.png"
                    id="minus-icon"
                    alt="Plus Icon"
                    class="inline w-4 rounded-full mr-1 minus-icon"
                  />Remove
                </a>
              </div>

              <!-- MOvie discription -->
              <div>
                <p class="text-[#6B7280] text-sm h-24 overflow-clip dark:text-[#A5A5A5]">
                  ${Plot}
                </p>
              </div>
            </div>
        </div>
        <hr class="text-black border-[1.5px] w-full text-lg font-bold my-5 dark:border-[#2C2C2C]" />`;

    movieListDiv.classList.remove("hidden");
    movieListDiv.innerHTML += movieCard;
    const removeMovieFromWatchListBtn = document.getElementsByClassName(
      "remove-from-watchlist-btn"
    );

    //   get the clicked movie id and remove from watchlist
    Array.from(removeMovieFromWatchListBtn).forEach((singleMovie) => {
      singleMovie.addEventListener("click", () => {
        removeMovieFromWatchListHandler(singleMovie.dataset.id);
      });
    });

    // change add to watchlist icon in dark mode
    if (localStorage.theme === "dark") {
      let minusIcon = document.getElementsByClassName("minus-icon");
      Array.from(minusIcon).forEach((icon) => {
        icon.setAttribute("src", "/minuIconWhite.png");
      });
    }
  });
}

// remove the movie from the watchlist handler
function removeMovieFromWatchListHandler(id) {
  const filterdMovies = myWatchlist.findIndex((movie) => {
    return movie.imdbID == id;
  });
  myWatchlist.splice(filterdMovies, 1);
  localStorage.setItem("movies", JSON.stringify(myWatchlist));
}
