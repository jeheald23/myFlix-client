<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

=======
import React, { useState, useEffect, useCallback } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
>>>>>>> Stashed changes

export const MainView = () => {

<<<<<<< Updated upstream
  const [movies, setMovies] = useState([]);

const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  fetch("https://myflixapp-api-3e4d3ace1043.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
          image: movie.image,
          title: movie.title,
          releaseYear: movie.releaseYear,
          description: movie.description,
          genre: {
            name: movie.genre.name,
            description: movie.genre.description},
          director: {
            name: movie.director.name,
            bio: movie.director.bio},
          featured:movie.featured,
          actors: movie.actors
          };
        });

      setMovies(moviesFromApi);
    });
}, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
=======
  const fetchMovies = useCallback(async () => {
    try {
      if (token) {
        const response = await fetch("https://myflixapp-api-3e4d3ace1043.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.status}`);
        }

        const data = await response.json();

        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          releaseYear: movie.releaseYear,
          image: movie.image,
          description: movie.description,
          genre: {
            name: movie.genre.name,
            description: movie.genre.description,
          },
          director: {
            name: movie.director.name,
            bio: movie.director.bio,
          },
          actors: movie.actors,
          featured: movie.featured,
        }));

        setMovies(moviesFromApi);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <span>or</span>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
>>>>>>> Stashed changes
  );
};