import React from "react";
import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          font: "inherit",
          border: "1px solid #ff2058",
          color: "white",
          background: "red",
        }}
        onClick={() => props.onDeleteMovie(props.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
