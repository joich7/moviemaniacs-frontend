import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConf: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    AuthService.register(user);
  };

  return (
    <Container>
      <Row>
        <Col className="mx-auto">
          <div className="c-form text-white d-flex justify-content-center">
            <div className="col-3">
              <form onSubmit={handleRegister}>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="username"
                    name="username"
                    onChange={(e) => handleChange("username", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pass">Password (8 characters minimum):</label>
                  <input
                    type="password"
                    id="pass"
                    name="password"
                    minLength="8"
                    required
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="passConf">Confirm Password:</label>
                  <input
                    type="password"
                    id="passConf"
                    name="password"
                    minLength="8"
                    required
                    onChange={(e) =>
                      handleChange("passwordConf", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="fname"
                    required
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lname"
                    required
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Register"
                  disabled={
                    user.password &&
                    user.password.length >= 8 &&
                    user.password === user.passwordConf &&
                    user.firstName &&
                    user.lastName &&
                    user.email
                      ? false
                      : true
                  }
                />
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
