import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  
  const { title } = useParams();
  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);
  const movieRef = useRef(null);

  const movie = movies.find((m) => m.title === title);

  const similarMoviesGenre = movies.filter((m) => m.genre.name === movie.genre.name && m.title !== movie.title);
  const similarMoviesDirector = movies.filter((m) => m.director.name === movie.director.name && m.title !== movie.title);

  const toggleGenreDescription = () => {
    setShowGenreDescription(!showGenreDescription);
  };

  const toggleDirectorBio = () => {
    setShowDirectorBio(!showDirectorBio);
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div>
      <div ref={movieRef}>
        <h1>Movie Details</h1>
      </div>
      <div>
        <img src={movie.image} alt={movie.title} className="w-100" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.releaseYear}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span className="toggle-text" onClick={toggleGenreDescription}>
          {showGenreDescription ? "(Hide) " : "(Show) "}
        </span>
        {showGenreDescription && <span>{movie.genre.description}</span>}
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span className="toggle-text" onClick={toggleDirectorBio}>
          {showDirectorBio ? "(Hide) " : "(Show) "}
        </span>
        {showDirectorBio && <span>{movie.director.bio}</span>}
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors.join(", ")}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured.toString()}</span>
      </div>

      <div>
        <h2>{`More movies in the ${movie.genre.name} genre`}</h2>
        <Row className="mb-4" md={3}>
          {similarMoviesGenre.map((similarMovie) => (
            <MovieCard key={similarMovie.title} movie={similarMovie} />
          ))}
        </Row>
      </div>

      <div>
        <h2>{`More movies directed by ${movie.director.name}`}</h2>
        <Row className="mb-4" md={3}>
          {similarMoviesDirector.map((similarMovie) => (
            <MovieCard key={similarMovie.title} movie={similarMovie} />
          ))}
        </Row>
      </div>
      <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
      }),
      featured: PropTypes.bool.isRequired,
      actors: PropTypes.array.isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func
};
