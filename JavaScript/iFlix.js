
const Base_Url = 'https://api.themoviedb.org/3';
const Api_Key = 'api_key=88456b6b77af6a85b3f4898f0449cbcf';
const img_url = 'https://image.tmdb.org/t/p/w500';
//Movies Category
const TrendingMovies = Base_Url +'/trending/all/day?api_key=88456b6b77af6a85b3f4898f0449cbcf&language=en-US'
const Upcoming_Url = Base_Url + '/movie/upcoming?' + Api_Key
const TopRated = Base_Url + '/movie/top_rated?' + Api_Key
const FreeMoviesUrl = Base_Url + '/discover/movie?' + Api_Key + '&watch/providers=8|123';
//HTML Doms
const box = document.querySelectorAll('.box');
let box_top1 = document.querySelectorAll('.box_top1')
let box_top1Up = document.querySelectorAll('.box_top1Up')
let box_top2 = document.querySelectorAll('.box_top2')

getMovies(TrendingMovies);
function getMovies(url1) {
    fetch(url1)
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        showMovies(data.results);
    });
    //Trending movies
    function showMovies(data) {
        box.forEach((box,index) => {
            const {poster_path,title, release_date,vote_average,id} = data[index];
            let vote = vote_average.toFixed(1)
            let release_year = parseInt(release_date)
           let movieTitle = title.slice(0,19)
            box.innerHTML = '';
      const movieEl = document.createElement('div');
        movieEl.innerHTML =`
        <div class="box_top">
        <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
        <img class="box-image" src="${img_url + poster_path}" alt="">
        </a>
        <div class="movie-overlay">
        <div class="title-flex">
        <h3 class="box-title">${movieTitle}...</h3>
        </div>
        <div class="rating"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote}</div>
        <span class="release_date">${release_year}</span>
        </div>
        </div>
        `;
        box.appendChild(movieEl);  
    })
}
 }

//TopRated Movies
getMovies2(TopRated);
function getMovies2(url3) {
    fetch(url3)
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        showMovies3(data.results);
    });
}
function showMovies3(data) {
    box_top1.forEach((box_top1, index) => {
        box_top1.innerHTML = '';
        const {title,vote_average, poster_path,release_date,id} = data[index];
        let release_year = parseInt(release_date)
    let titleWord = title.slice(0,19)
    const moviePElement = document.createElement('div');
    moviePElement.innerHTML = `
    <div class="box_top1">
    <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
    <img class="box-image1" src="${img_url + poster_path}">
    </a>
    <div class="movie-overlay">
    <div class="title-flex">
    <h3 class="box-title">${titleWord+'...'}</h3>
    </div>
    <div class="rating"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote_average}</div>
    <span class="release_date">${release_year}</span>
    </div>
    </div>
        `;
        box_top1.appendChild(moviePElement);
    });
}
//Upcoming Movies
getMoviesUp(Upcoming_Url);
function getMoviesUp(url4) {
    fetch(url4)
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        showMoviesUp(data.results);
    });
}
function showMoviesUp(data) {
    box_top1Up.forEach((box_top1Up, index) => {
         box_top1Up.innerHTML = '';
        const {title,vote_average, poster_path,release_date,id} = data[index];
     let release_year = parseInt(release_date)
    let titleWord = title.slice(0,19)
        const movieUpElement = document.createElement('div');
        movieUpElement.innerHTML = `
        <div class="box_top1Up">
        <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
    <img class="box-image1Up" src="${img_url + poster_path}" alt='${title}'>
    </a>
    <div class="movie-overlay">
    <div class="title-flex">
    <h3 class="box-title">${titleWord+'...'}</h3>
    </div>
    <div class="rating"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote_average}</div>
    <span class="release_date">${release_year}</span>
    </div>
  </div>
        `;
        box_top1Up.appendChild(movieUpElement);
    });
}

//Free to Watch Movies
fetch(FreeMoviesUrl)
.then(res => res.json())
.then(data => {
    console.log(data.results);
    let box_top2 = document.querySelectorAll('.box_top2')
    box_top2.forEach((box_top2, index) => {
        box_top2.innerHTML = '';
        const { poster_path,title,release_date,vote_average,id} = data.results[index];
        let release_year = parseInt(release_date)
        let titleWord = title.slice(0,19)
        let freeElement = document.createElement('div');
        freeElement.innerHTML = `
            <div class="freeWatch">
                <div class="box_top2">
                <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
                    <img class="box-image2" src=${img_url + poster_path} 'alt = "${title}">
                    </a>
                    <div class="movie-overlay">
                    <div class="title-flex">
                    <h3 class="box-title">${titleWord}...</h3>
                    </div>
                    <div class="rating"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote_average}</div>
                    <span class="release_date">${release_year}</span>
                    </div>
            </div>
        `;
        box_top2.appendChild(freeElement);
    });

})
//Banner Movies Section! in iFlix 2...



