import React, { useState, useEffect } from "react";
import { useParams, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || "");
  const [token, setToken] = useState(storedToken || "");
  const [movies, setMovies] = useState([]);
  const { title } = useParams();
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("https://myflixapp-api-3e4d3ace1043.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching movies");
          }
          return response.json();
        })
        .then((data) => {
          const moviesFromApi = data.map((movie) => ({
            id: movie._id,
            title: movie.title,
            releaseYear: movie.releaseYear,
            image: movie.image,
            description: movie.description,
            genre: {
              name: movie.genre.name,
              description: movie.genre.description,
            },
            director: {
              name: movie.director.name,
              bio: movie.director.bio,
            },
            actors: movie.actors,
            featured: movie.featured,
          }));

          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        })
        .finally(() => {
          setLoadingMovies(false);
        });
    }
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <br />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/users/:Username" 
            element={<ProfileView user={user} storedUser={storedUser} storedToken={storedToken} movies={movies} />} 
          />
          <Route
            path="/movies/:title"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : loadingMovies ? (
                  <Col>Loading...</Col>
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : loadingMovies ? (
                  <Col>Loading...</Col>
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {title === undefined && <Col md={12}><h1>Browse All Movies</h1></Col>}
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          token={token}
                          setUser={setUser}
                          user={user}
                          visibilityToggle={false}   
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
