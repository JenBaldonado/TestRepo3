const FEATURE_URL =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=229d819906342a6a79fb1641a3951859&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=229d819906342a6a79fb1641a3951859&query="';
const form = document.getElementById("form");
const search = document.getElementById("search");

/*--------------------------------------------------------------HOME----------------------------------------------*/

const mainresult = document.getElementById("mainResults");

getresults(FEATURE_URL);

async function getresults(url) {
  const res = await fetch(url);
  const data = await res.json();

  showresult(data.results);
}

function showresult(results) {
  mainresult.innerHTML = "";

  results.forEach((result) => {
    const { title, poster_path, vote_average, overview } = result;

    const resultEl = document.createElement("div");
    resultEl.classList.add("movie");
    resultEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
           <h3>${title}</h3>
           <span class="${getClassByRate(vote_average)}">${vote_average}<span>
       </div>
       <div class="overview">
         <h3>Overview</h3>
         ${overview}
       </div>
      `;

    mainresult.appendChild(resultEl);
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
    getDrama(SEARCH_API + searchTerm);

    search.value = "";
    searchResult();
  } else {
    window.location.reload();
  }
});