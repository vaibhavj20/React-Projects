import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">The Generics</h1>
        <p className="hero-subtitle">Experience the Best of Music</p>
        <div className="button-group">
          <button className="cta-button">Get our Latest Album</button>
          <button className="play-button">▶</button>
        </div>
      </header>
      <section className="tour-dates">
        <h2 className="tour-title">Upcoming Tours</h2>
        <ul className="tour-list">
          <li className="tour-item">
            <span>JUL 16</span> DETROIT, MI{" "}
            <button className="tour-button">Buy Tickets</button>
          </li>
          <li className="tour-item">
            <span>JUL 19</span> TORONTO, ON{" "}
            <button className="tour-button">Buy Tickets</button>
          </li>
          <li className="tour-item">
            <span>JUL 22</span> BRISTOW, VA{" "}
            <button className="tour-button">Buy Tickets</button>
          </li>
          <li className="tour-item">
            <span>JUL 29</span> PHOENIX, AZ{" "}
            <button className="tour-button">Buy Tickets</button>
          </li>
          <li className="tour-item">
            <span>AUG 2</span> LAS VEGAS, NV{" "}
            <button className="tour-button">Buy Tickets</button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
