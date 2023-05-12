import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Modal from "./Modal";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request)
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const showImagesDelay = 100; // 延迟时间（毫秒）
    let timeout;

    if (movies.length > 0) {
      // 设置延迟逐个显示图片
      timeout = setTimeout(() => {
        setShowImages(true);
      }, showImagesDelay);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [movies]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };


  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie, index) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"} ${showImages ? "show" : ""
                  }`}
                key={movie.id}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                alt={movie.name}
                style={{
                  transitionDelay: `${index * 100}ms`, // 根据索引设置过渡延迟时间
                }}
                onClick={() => openModal(movie)}
              />
            )
        )}
      </div>
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default Row;