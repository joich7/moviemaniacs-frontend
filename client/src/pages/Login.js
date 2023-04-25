import React from "react";
import Container from "react-bootstrap/Container";
export default function () {
  return (
    <div>
      <Container>
        <div className="row d-flex justify-content-center m-5">
          <div className="col-3 bg-primary  p-3">
            <h2>Login</h2>
            <p>Email:</p>
            <input type="text" placeholder="Email"></input>
            <p>Password:</p>
            <input type="text" placeholder="Password"></input>
          </div>
        </div>
        <div className="row d-flex justify-content-center m-5">
          <div className="col-3 bg-primary  p-3">
            <h2>Create Account</h2>
            <p>First Name:</p>
            <input type="text" placeholder="First Name"></input>
            <p>Last Name:</p>
            <input type="text" placeholder="Last Name"></input>
          </div>
        </div>
      </Container>
    </div>
  );
}
