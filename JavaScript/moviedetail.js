import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelectorAll(".movie-detail");
const getGenres = function (genreList) {
  const newGenreList = [];
  for (const { name } of genreList) newGenreList.push(name);
  return newGenreList.join(", ");
};
const getCasts = function (castList) {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(", ");
};
const getDirectors = function (crewList) {
  const directors = crewList.filter(({ job }) => job === "Director");
  const directorList = [];
  for (const { name } of directors) directorList.push(name);
  return directorList.join(", ");
};
fetchDataFromServer(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases`,
  function (movie) {
    const {
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      genres,
      overview,
      casts: { cast, crew },
    } = movie;
    document.title = `${title} - iFlix`;
    let movieDetail = document.createElement('div')
    let voteaverage = vote_average.toFixed(1)
    pageContent.forEach(pageContent => {
    movieDetail.innerHTML = `
    <artical class="movie-detail">
    <div class="background_image" style="background-image: url(${imageBaseURL + backdrop_path});">
    <div class="brightness">
     <figure id="movie_poster">
    <img src="${imageBaseURL + poster_path}" class="movie_image" alt='${title}'>
    <div class="movie_detail">
      <h1 class="heading">${title}</h1>
      <div class="spancontent">
        <span class="movierating"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a; display: inline;"></i>${voteaverage}</span>
        <span class="movie_length">${runtime}m</span>
        <span class="movie_releasedate">${parseInt(release_date)}</span>
      </div>
      <h6 class="genre">${getGenres(genres)}</h6>
      <p class="overview">${overview}</p>
      <p class="actor_list"><span id='actor_span'> Actors: </span> ${getCasts(cast)}</p>
      <p class="Director"> <span id='Director_span'>Directed By: </span>${getDirectors(crew)}</p>
  </figure>
  </div>
  </div>
  </artical>
    `;
    pageContent.appendChild(movieDetail);
  })
})
// Fetch recommended movies
fetchDataFromServer(
  `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}`,
  function (recommendedMovies) {
    // Process the recommended movies and generate HTML content
    const movie_detail = document.getElementById("movies_content");
    movie_detail.innerHTML = '';
    recommendedMovies.results.forEach((movie) => {
      const { poster_path, title, vote_average, release_date,id } = movie;
      let vote = vote_average.toFixed(1)
      let movies_title = title.toString('').slice(0,25)
      // Create a container element for the recommended movie
      const recommendation = document.createElement("div");
      // Generate HTML content for the recommended movie
      let recommendTitle = document.getElementById('title').innerHTML = 'You May Also Like'
      recommendation.innerHTML = `
      <div id="hide_detail">
      <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
        <img class="movie_img_detail" src="${imageBaseURL + poster_path}">
        </a>
        <div class="title-recommend">
            <h3 class="box-title">${movies_title}...</h3>
          </div>
          <div class="rating_date">
          <div class = 'voting'> <i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote}</div>
          <span class="release_date">${parseInt(release_date)}</span>
          </div>
          </div>
          `;
          // Append the container to the movie_detail element
          movie_detail.appendChild(recommendation);
    });
  }
);

