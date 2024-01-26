import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import MovieCard from '../movie-card/movie-card';

export const ProfileView = ({ token }) => { // Assuming token is passed as a prop
  const { Username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${Username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
  
        const userData = await response.json();
        setUserData(userData); // Assuming setUserData is a state setter function
        const favoriteMovies = userData.FavoriteMovies || [];
        setFavoriteMovies(favoriteMovies);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Assuming setLoading is a state setter function
      }
    };
  
    fetchUserData();
  }, [Username, token]);

  return (
    <div>
      <h1>{Username}'s Profile</h1>

      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <h2>My Details</h2>
          <p>Username: {userData.Username}</p>
          <p>Password: {userData.Password}</p>
          <p>Email: {userData.Email}</p>
          <p>Birthday: {userData.Birthday}</p>

          <div>
            <h2>My Favorite Movies</h2>
            <div className="favorite-movies">
              {favoriteMovies && favoriteMovies.length > 0 ? (
                favoriteMovies.map((favoriteMovie) => (
                  <MovieCard key={favoriteMovie.title} movie={favoriteMovie} />
                ))
              ) : (
                <p>No favorite movies found.</p>
              )}
            </div>
          </div>

          <h2>Update or Delete My Profile</h2>
          <div>
            <button className="back-button">Update</button>
            <span className="button-spacing"></span>
            <button className="back-button">Delete</button>
          </div>
        </div>
      ) : (
        <p>Error loading user data</p>
      )}
    </div>
  );
};






