import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter) || ""; // Provide default value for filter

  // Ensure filter is a string before calling trim and toLowerCase
  const normalizedFilter = typeof filter === "string" ? filter.trim().toLowerCase() : "";

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <Row className="mb-4">
        <MoviesFilter />
      </Row>
      <Row className="mt-4">
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default MoviesList;

