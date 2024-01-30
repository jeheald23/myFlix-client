import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ user, onBackClick }) => {
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [userData, setUserData] = useState(null); // Define userData state
    const { Username } = useParams();

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
            })
            .finally(() => {
                setLoadingUserData(false);
            });
    }, [Username]);

    // Check if userData is null to avoid errors
    if (!userData) return <div>Loading...</div>;

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
    onBackClick: PropTypes.func.isRequired,
};
