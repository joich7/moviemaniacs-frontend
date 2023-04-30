import React from "react";
import { Link, Router } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import AuthService from "../services/auth.service";

export default function NavbarComp({ searchMovies, navigateToHome }) {
  const [state, dispatch] = useGlobalState();
  let loggedIn = state.currentUser != null ? true : false;
  const [searchInput, setsearchInput] = useState("");
  function logout() {
    navigateToHome();
    AuthService.logout();
    dispatch({
      currentUserToken: null,
      currentUser: null,
      watchlistId: null,
      favoritesId: null,
    });
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-3"
    >
      <Container>
        <Navbar.Brand>MOVIE MANIACS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link className="text-decoration-none text-white" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link className="text-decoration-none text-white" to="/login">
                Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link className="text-decoration-none text-white" to="/contact">
                Contact Us
              </Link>
            </Nav.Link>
          </Nav>

          <Nav className="gap-2">
            {loggedIn ? (
              <>
                {" "}
                <Nav.Link>
                  <div
                    className="btn btn-primary text-black"
                    onClick={() => logout()}
                  >
                    Logout
                  </div>
                </Nav.Link>
                <Nav.Link>
                  <Link className="btn btn-light text-black" to="/profile">
                    Profile
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link>
                  <Link className="btn btn-primary text-black" to="/login">
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="btn btn-light text-black" to="/register">
                    Sign up
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              className="me-2"
              aria-label="Search"
              placeholder="Search for Movies"
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
            <Button
              variant="outline-success"
              onClick={() => searchMovies(searchInput)}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// <div>
// <Navbar className="faded-Dark nav">
//   <Container className="retro-text align-content">
//     <Nav className="gradient-text me-auto">
//       <Nav.Link as={Link} to={"/"}>
//         <h1 className=""> HOME </h1>
//       </Nav.Link>
//       <Nav.Link as={Link} to={"/"}>
//         <h1 className="">BROWSE</h1>
//       </Nav.Link>
//       <Nav.Link as={Link} to={"/login"}>
//         <h1 className="">LOGIN</h1>
//       </Nav.Link>
//     </Nav>
//     <form className="d-flex">
//       <div>
//         <input
//           type="text"
//           placeholder="Search for Movies"
//           value={searchInput}
//           onChange={(e) => setsearchInput(e.target.value)}
//         />
//         <img
//           src={SearchIcon}
//           alt="search"
//           onClick={() => props.searchMovies(searchInput)}
//         />
//       </div>
//     </form>
//   </Container>
// </Navbar>
// </div>
