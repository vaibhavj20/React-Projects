import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import Loader from "./components/Loader";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  // Function to fetch movies
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
      setError(null);
      clearInterval(retryInterval);
    } catch (error) {
      setError(error.message);

      if (!retryInterval) {
        const intervalId = setInterval(fetchMovies, 5000);
        setRetryInterval(intervalId);
      }
    }

    setIsLoading(false);
  }, [retryInterval]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Clean up retryInterval on component unmount
  useEffect(() => {
    return () => {
      if (retryInterval) {
        clearInterval(retryInterval);
      }
    };
  }, [retryInterval]);

  // Handler to cancel retry
  function cancelRetryHandler() {
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
      setIsLoading(false);
      setError("Retry cancelled by user.");
    }
  }

  function addMovieHandler(movie) {
    console.log(movie);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
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
