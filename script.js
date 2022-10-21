
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
  const titleChange = document.getElementById('subtitle').innerHTML ="Search Results"

  if (searchTerm && searchTerm !== "") {
    getresults(SEARCH_API + searchTerm);
  

    search.value = "";
  } else {
    window.location.reload();
  }
});

/*-----------------------------------THEATHER--------------------------------------*/
const THEATER_URL =
  "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-10-01&primary_release_date.lte=2022-12-31&api_key=229d819906342a6a79fb1641a3951859&page=1";

const mainTheater = document.getElementById("mainTheater");

getTheater(THEATER_URL);

async function getTheater(url) {
  const res = await fetch(url);
  const data = await res.json();

  displayTheater(data.results);
}

function displayTheater(theaters) {
  mainTheater.innerHTML = "";

  theaters.forEach((theater) => {
    const { title, poster_path, vote_average, overview, release_date } =
      theater;

    const theaterEl = document.createElement("div");
    theaterEl.classList.add("movie");
    theaterEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="release">Release date: ${release_date}</div>
      <div class="movie-info">
           <h3>${title}</h3>
           <span class="${getClassByRate(vote_average)}">${vote_average}<span>
       </div>
       <div class="overview">
         <h3>Overview</h3>
         ${overview}
       </div>
      `;

    mainTheater.appendChild(theaterEl);
  });
}

/*-----------------------------------DRAMA--------------------------------------*/
const DRAMA_URL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=229d819906342a6a79fb1641a3951859&page=1";

const mainDrama = document.getElementById("mainDrama");

getDrama(DRAMA_URL);

async function getDrama(url) {
  const res = await fetch(url);
  const data = await res.json();

  displayDrama(data.results);
}

function displayDrama(dramas) {
  mainDrama.innerHTML = "";

  dramas.forEach((drama) => {
    const { title, poster_path, vote_average, overview } = drama;

    const dramaEl = document.createElement("div");
    dramaEl.classList.add("movie");
    dramaEl.innerHTML = `
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

    mainDrama.appendChild(dramaEl);
  });
}

/*--------------------------------------------------------------HOME----------------------------------------------*/
const HIGHEST_URL =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=229d819906342a6a79fb1641a3951859&page=1";

const mainresult = document.getElementById("mainResults");

getresults(HIGHEST_URL);

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

/*------------------------------Trailers--------------------------*/
let nextPageToken ="";
function getVideos(){
  fetch ("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCi8e0iOVk1fEOogdfu4YgfA&maxResults=8&key=AIzaSyATjKteLjW4PU1CiVjWAqvruMR27Bau29g&pageToken="+nextPageToken).then((result) => {
  return result.json()
}).then((data) => {
  let videos = data.items
  nextPageToken = data.nextPageToken
  let videoContainer = document.getElementById('trailer')
  for (video of videos) {
    let videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`
    videoContainer.innerHTML += `
    <img src="${video.snippet.thumbnails.high.url}">`
  }
})
};

getVideos();