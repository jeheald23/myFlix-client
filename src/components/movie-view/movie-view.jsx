import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './movie-view.scss';
import { CardImg } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { title } = useParams();
  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);
  const movieRef = useRef(null);

  const movie = movies.find((m) => m.title === title);

  const similarMoviesGenre = movies.filter((m) => m.genre.name === movie.genre.name && m.title !== movie.title);
  const similarMoviesDirector = movies.filter((m) => m.director.name === movie.director.name && m.title !== movie.title);

  const hasSimilarMoviesInGenre = similarMoviesGenre.length > 0;
  const hasSimilarMoviesByDirector = similarMoviesDirector.length > 0;

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

        <Row>
          <h2>{`More movies in the ${movie.genre.name} genre`}</h2>
          {similarMoviesGenre.length > 0 ? (
            similarMoviesGenre.map((similarMovie) => (
              <Col className="mb-4" key={similarMovie.id} md={3}>
                <MovieCard 
                key={similarMovie.id}
                movie={similarMovie}
                user={user}
                token={token}
                setUser={setUser} 
                />
              </Col>
            ))
          ) : (
            <Col md={12}>
              <p>There are currently no other {movie.genre.name} movies in the database.</p>
            </Col>
          )}
        </Row>

        <Row>
          <h2>{`More movies directed by ${movie.director.name}`}</h2>
          {similarMoviesDirector.length > 0 ? (
            similarMoviesDirector.map((similarMovie) => (
              <Col className="mb-4" key={similarMovie.id} md={3}>
              <MovieCard
              key={similarMovie.id}
              movie={similarMovie}
              user={user}
              token={token}
              setUser={setUser}
              />
              </Col>
            ))
          ) : (
            <Col md={12}>
            <p>There are currently no other movies directed by {movie.director.name} in the database.</p>
          </Col>
          )}
        </Row>

        <div>
          <br />
          <Link to={"/"}>
            <button className="back-button">Back</button>
          </Link>
        </div>
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
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default MovieView;