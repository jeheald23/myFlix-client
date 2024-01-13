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
<<<<<<< Updated upstream
      const moviesFromApi = data.docs.map((doc) => {
        return {
          id: doc.key,
          title: doc.title,
          image: doc.image_url,
          director: doc.director_name?.[0]
        };
      });
=======
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
>>>>>>> Stashed changes

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