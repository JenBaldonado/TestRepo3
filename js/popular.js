const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=229d819906342a6a79fb1641a3951859&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=229d819906342a6a79fb1641a3951859&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getPopulars(API_URL);

async function getPopulars(url) {
  const res = await fetch(url);
  const data = await res.json();

  showpopulars(data.results);
}

function showpopulars(populars) {
  main.innerHTML = "";

  populars.forEach((popular) => {
    const { title, poster_path, vote_average, overview } = popular;

    const popularEl = document.createElement("div");
    popularEl.classList.add("movie");
    popularEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getClassByRate(vote_average)}">
         ${vote_average}
         <span>
     </div>
     <div class="overview">
       <h3>Overview</h3>
       ${overview}
     </div>
    `;

    main.appendChild(popularEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  function searchResult() {
    documment.getElementById("subtitle").innerHTML = "Search Results";
  }

  if (searchTerm && searchTerm !== "") {
    getPopulars(SEARCH_API + searchTerm);

    search.value = "";
    searchResult();
  } else {
    window.location.reload();
  }
});

