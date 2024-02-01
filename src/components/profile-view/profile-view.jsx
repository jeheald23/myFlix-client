import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(storedUser.Email);
    const [birthday, setBirthday] = useState(storedUser.Birthday);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (storedToken) {
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
                    const userDataFromApi = {
                        username: data.Username,
                        password: data.Password,
                        email: data.Email,
                        birthday: data.Birthday,
                        favoriteMovies: data.FavoriteMovies,
                    };
                    setUserData(userDataFromApi);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [storedToken, storedUser]);

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
                alert("Update successful");
                window.location.reload();
            } else {
                alert("Update failed");
            }
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
            <div><h2>My Details</h2></div>
            <div>
                <span>Username: </span>
                <span>{userData.username}</span>
            </div>
            <div>
                <span>Password: </span>
                <span>{userData.password}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{userData.email}</span>
            </div>
            <div>
                <span>Birthday: </span>
                <span>{userData.birthday}</span>
            </div>
            
            <div><h2>My Favorite Movies</h2></div>
            <div className="favorite-movies">
          {favoriteMovies.map((FavoriteMovie) => (
            <MovieCard key={FavoriteMovie.title} movie={FavoriteMovie} />
          ))}
        </div>

            <div>
                <div><h2>Update or Delete My Profile</h2></div>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleUpdate}>
                        Update Profile
                    </Button>
                    <Button variant="danger" type="submit" onClick={handleDelete}>
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
        birthday: PropTypes.instanceOf(Date).isRequired,
        favoriteMovies: PropTypes.array.isRequired,
    }).isRequired,
};