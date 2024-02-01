import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";

import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { title } = useParams();
  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

  const movie = movies.find((m) => m.title === title);

  const similarMoviesGenre = movies.filter((m) => m.genre.name === movie.genre.name && m.title !== movie.title);
  const similarMoviesDirector = movies.filter((m) => m.director.name === movie.director.name && m.title !== movie.title);

  const toggleGenreDescription = () => {
    setShowGenreDescription(!showGenreDescription);
  };

  const toggleDirectorBio = () => {
    setShowDirectorBio(!showDirectorBio);
  };

  const addFavorite = () => {
    useEffect(() => {
      fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${Username}/movies/${MovieID}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.ok) {
          alert("Movie added to favorites");
          window.location.reload();
        } else {
          alert("Movie not added to favorites");
        }
      });
    });
  };

  const removeFavorite = () => {
    useEffect(() => {
      fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${Username}/movies/${MovieID}`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.ok) {
          alert("Movie removed from favorites");
          window.location.reload();
        } else {
          alert("Movie not removed from favorites");
        }
      });
    });
  };

  return (
    <div>
      <div>
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
      <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
      <div>
        <Button variant="primary" type="submit" onClick={addFavorite}>
          Add to Favorites
        </Button>
        <Button variant="primary" type="submit" onClick={removeFavorite}>
          Remove from Favorites
        </Button>
      </div>
      
      <div>
        <h2>Similar Movies by Genre</h2>
        <div className="similar-movies">
          {similarMoviesGenre.map((similarMovie) => (
            <MovieCard key={similarMovie.title} movie={similarMovie} />
          ))}
        </div>
      </div>

      <div>
        <h2>Similar Movies by Director</h2>
        <div className="similar-movies">
          {similarMoviesDirector.map((similarMovie) => (
            <MovieCard key={similarMovie.title} movie={similarMovie} />
          ))}
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
  onBackClick: PropTypes.func.isRequired,
};
