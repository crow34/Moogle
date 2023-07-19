"use strict";
const api_key ="88456b6b77af6a85b3f4898f0449cbcf";
const imageBaseURL = "https://image.tmdb.org/t/p/w500";
// Fetch data from a server using the 'url' and pass the result in Json'
const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
  .then((response) => response.json())
  .then((data) => callback(data, optionalParam));
};
export { imageBaseURL, api_key, fetchDataFromServer };