import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getPopularMovieList = async () => {
  const movie = await axios.get(
    `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`
  );
  return movie.data.results;
};

export const searchMovie = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?query=${q}&page=1&&api_key=${apiKey}`
  );
  return search.data;
};

export const getOngoingMovieList = async () => {
  const movie = await axios.get(
    `${baseUrl}/movie/now_playing?page=1&api_key=${apiKey}`
  );
  return movie.data.results;
};

export const authenticateUser = async (username, passowrd) => {
  const url = `${baseUrl}/authentication/token/new?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json;
  const token = data.request_token;

  const loginUrl = `${baseUrl}/authentication/token/validate_with_login?api_key=${apiKey}`;
  const loginResponse = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, passowrd, request_token: token }),
  });

  const loginData = await loginResponse.json();

  const sessionUrl = `${baseUrl}/authentication/session/new?api_key=${apiKey}`;
  const sessionResponse = await fetch(sessionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ request_token: loginData.request_token }),
  });
  const sessionData = await sessionResponse.json();
  return sessionData.session_id;
};
