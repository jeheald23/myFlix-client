import React, { useRef, useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

import PropTypes from "prop-types"; // Import PropTypes

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [navBarHeight, setNavBarHeight] = useState(0); // State to store the height
  const navigate = useNavigate(); // Initialize useNavigate hook
  const navRef = useRef(null); // Create a ref for the navigation bar

  useEffect(() => {
    // Update the state with the height of the navigation bar
    if (navRef.current) {
      setNavBarHeight(navRef.current.offsetHeight);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLoggedOut();
    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" ref={navRef}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Call handleLogout on click */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Add prop type validation
NavigationBar.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
    movies: PropTypes.array
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};

