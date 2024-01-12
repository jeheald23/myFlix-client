import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {

  const [movies, setMovies] = useState([]);

const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  fetch("https://myflixapp-api-3e4d3ace1043.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
          Title: movie.title,
          ReleaseYear: movie.releaseYear,
          Description: movie.description,
          Genre: movie.genre.name,
          GenreDescription: movie.genre.description,
          Director: movie.director.name,
          Bio: movie.director.bio,
          Birthyear: movie.director.birthYear,
          DeathYear: movie.director.deathYear,
          Featured:movie.featured,
          Actors: movie.actors
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
  );
};