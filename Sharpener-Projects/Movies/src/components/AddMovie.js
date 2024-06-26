import React, { useState } from "react";
import styles from "./AddMovie.module.css";

function AddMovie({ onAddMovie }) {
  const [newMovie, setNewMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    onAddMovie(newMovie);
    setNewMovie({ title: "", openingText: "", releaseDate: "" }); // Clear form
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newMovie.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="openingText">Opening Text</label>
        <textarea
          id="openingText"
          name="openingText"
          value={newMovie.openingText}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date</label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={newMovie.releaseDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovie;
