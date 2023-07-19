import { api_key, imageBaseURL } from "./api.js";
const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
  .then((response) => response.json())
  .then((data) => callback(data, optionalParam));
  };
// Function to handle the search functionality
const searchMovies = function (query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
  fetchDataFromServer(url, handleSearchResults);
};
// Function to handle the search results
const handleSearchResults = function (data) {
  const movies = data.results;
  let noResult = document.getElementById('noResult')
  let showingResult = document.getElementById('showingResult')
  const searchInput = document.getElementById("movieInput");
  let movie_detail = document.querySelectorAll('.movie-detail')
  movie_detail.forEach(movie_detail => {
    movie_detail.style.display = 'none'
});
let movie_list = document.querySelectorAll('.movie-list')
   movie_list.forEach(movie_list => {
       movie_list.style.display = 'none'
   });
  let inputStr = searchInput.value
  if(data.results == ''){
    noResult.innerHTML = 'No Result Found for This Search.'
    showingResult.style.display = 'none'
    noResult.style.display = 'flex' 
  }
  else{
    showingResult.innerHTML = `Showing Results for: ${inputStr}`
    noResult.style.display = 'none'
    showingResult.style.display = 'flex'
  }
  renderMovies(movies);
};
// Function to render movies on the webpage
const renderMovies = function (movies) {
  const movie_detail = document.getElementById("search_result");
  movie_detail.innerHTML = ''; 
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, release_date,id } = movie;
    const SearchElement = document.createElement("div");
let edit_title = title.slice(0,23)
 SearchElement.innerHTML = `
 <div id="result_detail">
 <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
      <img id="search_image" src="${imageBaseURL + poster_path}" alt="">
      </a>
      <div id="search_title">${edit_title}...</div>
      <div class="search_detail">
      <div id="release_date">${parseInt(release_date)}</div>
      <div id="rating"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote_average.toFixed(1)}</div>
      </div>
      </div>
    `;
    movie_detail.appendChild(SearchElement);
  });
};
// Function to handle the search input
const handleSearchInput = function (event) {
  event.preventDefault()
  const searchQuery = event.target.value;
  if (searchQuery.trim() !== "") {
    searchMovies(searchQuery);
    document.getElementById('main_container').style.display = 'none'
    document.getElementById('search_result').style.display = 'grid'
    document.getElementById('result_detail').style.display = 'block'
  } else {
    // Clear the search results if the input is empty
    let movie_list = document.querySelectorAll('.movie-list')
    movie_list.forEach(movie_list => {
       movie_list.style.display = 'block'
       movie_list.style.marginTop = '29rem'
       document.getElementById('result_detail').style.display = 'none'
       document.getElementById('search_result').style.display = 'none'
    });
    let movie_detail = document.querySelectorAll('.movie-detail')
    movie_detail.forEach(movie_detail => {
      movie_detail.style.display = 'block'
       document.getElementById('result_detail').style.display = 'none'
       document.getElementById('movies_content').style.marginTop = '28rem'
       document.getElementById('title').style.top = '27rem'
      });
      document.getElementById('main_container').style.display = 'block'
      document.getElementById('main_container').style.marginTop = '39rem'
      document.getElementById('search_result').style.display = 'none'
      document.getElementById('showingResult').style.display = 'none'
  }
};
// Event listener for the search input
const searchInput = document.getElementById("movieInput");
searchInput.addEventListener("input", handleSearchInput);
