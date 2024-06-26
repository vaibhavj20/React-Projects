// import React, { useState } from "react";

// import MoviesList from "./components/MoviesList";
// import "./App.css";
// import Loader from "./components/Loader";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function fetchMovieHandler() {
//     setIsLoading(true);
//     setError(null);

//     try {
//       //fetched api
//       const response = await fetch("https://swapi.dev/api/films/");

//       if (!response.ok) {
//         throw new Error("Something went wrong....Retrying");
//       }
//       const data = await response.json();

//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMovieHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {/* {!isLoading && movies.length === 0 && <p>No Movies Found</p>} */}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <Loader />}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  useEffect(() => {
    return () => {
      if (retryInterval) {
        clearInterval(retryInterval);
      }
    };
  }, [retryInterval]);

  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
      setError(null); // Clear any previous error messages
      clearInterval(retryInterval); // Clear the retry interval on success
    } catch (error) {
      setError(error.message);

      if (!retryInterval) {
        const intervalId = setInterval(fetchMovieHandler, 5000);
        setRetryInterval(intervalId);
      }
    }

    setIsLoading(false);
  }

  function cancelRetryHandler() {
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
      setIsLoading(false);
      setError("Retry cancelled by user.");
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {retryInterval && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <Loader />}
      </section>
    </React.Fragment>
  );
}

export default App;
