import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import MovieCard from './MovieCard';

export const ProfileView = () => {
  const { Username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.title))

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${Username}`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [Username]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <h1>My Profile</h1>
          <h2>My Details</h2>
          <p>Username: {userData.Username}</p>
          <p>Email: {userData.Email}</p>
          <p>Birthday: {userData.Birthday}</p>
          <div>
            <h2>My Favorite Movies</h2>
            <div className="favorite-movies">
              {userData.favoriteMovies.map((favoriteMovie) => (
                <MovieCard key={favoriteMovie.title} movie={favoriteMovie} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Error loading user data</p>
      )}
    </div>
  );
};




