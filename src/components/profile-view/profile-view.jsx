import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ user, storedUser, storedToken }) => {
    const [userData, setUserData] = useState(user || null);
    const [Username, setUsername] = useState(storedUser ? storedUser.Username : '');
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState(storedUser ? storedUser.Email : '');
    const [Birthday, setBirthday] = useState(storedUser ? storedUser.Birthday : '');

    const FavoriteMovies = user.FavoriteMovies ? movies.filter((movie) => user.FavoriteMovies.includes(movie.id)) : [];

    useEffect(() => {
        if (storedToken && !storedUser) {
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
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
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

    return (
        <div>
            <div>
                <h1>{`${storedUser.Username}'s Profile`}</h1>
            </div>
            <div>
                <p>Username: {userData.Username}</p>
                <p>Email: {userData.Email}</p>
                <p>Birthday: {userData.Birthday}</p>
            </div>
            <h2>My Favorite Movies</h2>
            <div className="favorite-movies">
            {FavoriteMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
               ))}
            </div>
            
            <div>
                <h2>Update or Delete My Profile</h2>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={Birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>

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
        storedUser: PropTypes.object,
        storedToken: PropTypes.string,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.array.isRequired,
    }).isRequired,
};

