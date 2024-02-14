import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const Username = user?.Username;

  useEffect(() => {
    if (user?.favoriteMovies && user.favoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, movie.id]);

      const addFavoriteMovie = () => { 
        console.log(movie)
        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${Username}/movies/${movie.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log("Failed to add favorite movie");
              throw new Error("Failed to add favorite movie");
            }
          })
          .then((updatedUser) => {
            alert("successfully added to favorites");
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsFavorite(true);
          })
          .catch((error) => {
            console.error("Error adding favorite movie:", error);
            alert("Failed to add favorite movie");
          });
      };

      const removeFavoriteMovie = () => {
        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to remove favorite movie");
            }
          })
          .then((updatedUser) => {
            alert("successfully deleted from favorites");
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsFavorite(false);
          })
          .catch((error) => {
            console.error("Error removing favorite movie:", error);
            alert("Failed to remove favorite movie");
          });
      };

      return (
        <Card className="h-100">
          <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
            <Card.Img variant="top" src={movie.image} />
          </Link>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director.name}</Card.Text>
          </Card.Body>
          <div className="favorite-btns">
            {!isFavorite ? (
              <Button className="fav-btn" onClick={addFavoriteMovie}>+</Button>
            ) : (
              <Button className="fav-btn" onClick={removeFavoriteMovie}>-</Button>
            )}
          </div>
        </Card>
      );
    };

    MovieCard.propTypes = {
      movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
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
      token: PropTypes.string.isRequired,
      setUser: PropTypes.func.isRequired,
      user: PropTypes.string.isRequired
    };

export default MovieCard;