//TMDB
//Some Url for movies
const API_KEY = 'api_key=a4fe806fcfef36fbab902927a593e894';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'http://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

// Get ALl Movies
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

//All movie cards
function showMovies(data) {
  main.innerHTML = '';
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `  
        <img
        src="${IMG_URL + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${truncateOverView(title, 20)}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="date">
        ${splitToDate(release_date)}
      </div>
      <div class="overview">
        ${overview}
      </div>
      `;

    main.appendChild(movieEl);
  });
}

//splits the date string into pieces
function splitToDate(dates) {
  const date = dates.split('-');
  const year = date[0];
  return year;
}

//Determines color by imdb
function getColor(vote) {
  console.log(vote);
  if (vote >= 8) {
    return 'red';
  } else if (vote >= 5) {
    return 'purple';
  } else {
    return 'black';
  }
}

//Shortens long titles after certain characters
function truncateOverView(string, maxlength) {
  if (!string) return null;
  if (string.length <= maxlength) return string;
  return `${string.substring(0, maxlength)} ...`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
