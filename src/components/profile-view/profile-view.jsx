import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, onBackClick }) => {
    const [userData, setUserData] = useState(null); // Define userData state
    const { Username } = useParams();

    //get user data from API
    useEffect(() => {
        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${Username}`)
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
    }, [Username]);

    // Check if userData is null to avoid errors
    if (!userData) return <div>Loading...</div>;

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${username}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
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

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${username}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Profile delete successfully");
                window.location.reload();
            } else {
                alert("Unable to delete profile");
            }
        });
    };

    // Render user details
    return (
        <div>
            <div>
                <h1>My Details</h1>
            </div>

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
            <div>
                <span>Favorite Movies: </span>
                <span>{userData.favoriteMovies.join(", ")}</span>
            </div>

            <div>
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

                    <Button variant="primary" type="update">
                        Update Profile
                    </Button>
                    <Button variant="primary" type="delete">
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
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired,
        favoriteMovies: PropTypes.array.isRequired,
    }).isRequired,
};
