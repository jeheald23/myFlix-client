import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(storedUser ? storedUser.Username : '');
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(storedUser ? storedUser.Email : '');
    const [birthday, setBirthday] = useState(storedUser ? storedUser.Birthday : '');
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (storedToken) {
            fetchUserData();
        }
    }, [storedToken, storedUser]);

    const fetchUserData = () => {
        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${storedUser.Username}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching user data");
            }
            return response.json();
        })
        .then((data) => {
            setUserData(data);
            setFavoriteMovies(data.favoriteMovies || []);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${storedUser.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${storedToken}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                return response.json(); // Parse JSON response
            } else {
                throw new Error('Update failed');
            }
        })
        .then((updatedUser) => {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUserData(updatedUser);
            alert('Update successful');
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
            alert('Update failed');
        });
    };

    const handleDelete = (event) => {
        event.preventDefault();

        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${storedUser.Username}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${storedToken}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Profile deleted successfully");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href="/login";
            } else {
                alert("Unable to delete profile");
            }
        });
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <h1>{`${storedUser.Username}'s Profile`}</h1>
            </div>
            {/* Display user details */}
            {/* Display favorite movies */}
            <div>
                <h2>My Favorite Movies</h2>
                <div className="favorite-movies">
                    {favoriteMovies.map((movie) => (
                        <MovieCard key={movie.movieID} movie={movie} />
                    ))}
                </div>
            </div>

            {/* Update and delete form */}
            <div>
                <h2>Update or Delete My Profile</h2>
                <Form onSubmit={handleUpdate}>
                    {/* Form fields */}
                    <Button variant="primary" type="submit">
                        Update Profile
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Profile
                    </Button>
                </Form>
            </div>
        </div>
    );
};

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.array.isRequired,
    }).isRequired,
};
