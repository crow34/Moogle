const bannerMovies =  Base_Url + '/discover/movie?' + Api_Key
const backdropURL = `https://image.tmdb.org/t/p/original`;
fetch(bannerMovies)
  .then(res => res.json())
  .then(data => {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];
    const backdropPath = randomMovie.backdrop_path;
    const posterURL = backdropURL + backdropPath;
  const postertitle = randomMovie.title
  const bannerRD = randomMovie.release_date
  const bannerOverview = randomMovie.overview
 const vote_average = randomMovie.vote_average
 let titleSlice = postertitle.slice(0,30)
  console.log(data)
  let background = document.querySelectorAll('.background');
  background.forEach(background => {
      let bannerElement = document.createElement('div');
      let overviewLength = bannerOverview.slice(0,200)
      bannerElement.innerHTML = `
      <div class="background">
      <div id='MoviesBanners' style="background-image:url(${posterURL});">
      </a>
      <div class="banner_fadeBottom"></div>
      <div class="collectionBD">
      <div class="banner_fadeBottom1"></div>
      <div class="bannertitle">${titleSlice}...</div>
      <div class="bannerReleaseDate"><div id='bannerRating'><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote_average}</div><div class='releaseDate'>${parseInt(bannerRD)}</div></div>
    <div class="bannerOverview">${overviewLength}...</div>
    <div class="buttonSection">
    <a href="index.html" class="btn" onclick="getMovieDetail()">
    <button id="btn1"><img src="./manualimages/buttonPlay - Copy.png"  id='buttonPlay'>Watch Now!</button>
    </a>
    </div>
      </div>
      </div>
      `;
      background.appendChild(bannerElement);
    });
  })
  .catch(error => {
    console.error('Error fetching random movie poster:', error);
  });
