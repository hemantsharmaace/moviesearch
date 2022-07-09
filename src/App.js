import { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState([]);
  let i = 1;
  const searchMovie = (e) => {
    //   console.log(e.target.value);
    setSearch(e.target.value);
    axios
      .get("https://fake-movie-database-api.herokuapp.com/api", {
        params: {
          s: search
        }
      })
      .then(function (response) {
        setMovieData(response.data.Search);
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };
  return (
    <div className="App">
      <div style={{ width: "100%", color: "red" }}>
        Search Movie :
        <input
          type="text"
          name="search_movie"
          value={search}
          onChange={(e) => searchMovie(e)}
        />
      </div>
      <div className="movieList">
        {movieData
          ? movieData.map((movie) => {
              i++;
              return (
                <div key={i} className="movieItem">
                  <img
                    alt={movie.Title}
                    src={movie.Poster}
                    style={{ width: "50%", height: "auto" }}
                  />
                  <span>{movie.Title}</span>
                </div>
              );
            })
          : "No Movie found"}
      </div>
    </div>
  );
}
