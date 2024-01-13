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
          image: movie.image,
          title: movie.title,
          releaseYear: movie.releaseYear,
          description: movie.description,
          genre: {
            name: movie.genre.name,
            description: movie.genre.description},
          director: {
            name: movie.director.name,
            bio: movie.director.bio,
            birthYear: movie.director.birthYear,
            deathYear: movie.director.deathYear},
          featured:movie.featured,
          actors: movie.actors
          };
        });
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
  );
};