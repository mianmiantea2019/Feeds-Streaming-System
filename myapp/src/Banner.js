import React, { useEffect, useState } from "react";
import "./Banner.css";
// import axios from "./axios";
import requests from "./Requests";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Make a GET request using the instance
        const request = await instance.get('/trending/all/week');

        // Handle the response data
        console.log(request.data);
        setMovie(request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }

    fetchData();
  }, []);

  console.log(movie);
  
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
