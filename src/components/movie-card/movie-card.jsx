import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};


  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,  
        description: PropTypes.string.isRequired
      }),
      director: PropTypes.shape({
        name:  PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired
      }),
      featured: PropTypes.bool.isRequired,
      actors: PropTypes.array.isRequired
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };