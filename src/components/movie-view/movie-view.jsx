
import React, { useState } from "react";
import PropTypes from "prop-types";

import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

  const toggleGenreDescription = () => {
    setShowGenreDescription(!showGenreDescription);
  };

  const toggleDirectorBio = () => {
    setShowDirectorBio(!showDirectorBio);
  };

  return (
    <div>
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
        <span
          className="toggle-text"
          onClick={toggleGenreDescription}
        >
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
        <span
          className="toggle-text"
          onClick={toggleDirectorBio}
        >
          {showDirectorBio ? "(Hide) " : "(Show) "}
        </span>
        {showDirectorBio && <span>{movie.director.bio}</span>}
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors.join(', ')}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured.toString()}</span>
      </div>
      <button onClick={onBackClick} className="back-button">
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};