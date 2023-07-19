"use strict";
import { imageBaseURL } from "./api.js";
// Movies cards
export function createMovieCard(movie) {
  const { poster_path, title, vote_average, release_date, id } = movie;
  const card = document.createElement("div");
  let titleword = title.slice(0,19)
  card.classList.add("movie-card");
  card.innerHTML = `
  <div class="meta-list">
  <a href="detail.html" class="btn" onclick="getMovieDetail(${id})">
  <div><img  src="${imageBaseURL + poster_path}" loading="lazy" id='filter_image' alt=""/></div>
  </a>
  <h4 class="titleGenre">${titleword}...</h4>
      <div class="span"><i class="fa-sharp fa-solid fa-star" style="color: #e4ff1a;"></i>${vote_average.toFixed(1)}</div>
        <div class="card-badge">${release_date.split("-")[0]}</div>
      </div>
  `;
  return card;
}