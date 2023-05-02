import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import Row from "react-bootstrap/Row";

const Login = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useGlobalState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
      console.log(state.loggedIn);
      navigate("/profile");
    });
  };

  return (
    <>
      <div className="p-5"></div>
      <div className="row align-middle">
        <div className="col-1 mx-auto">
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
              <div className="Auth-form-content text-white">
                <Row></Row>
                <h2 className="text-center">Sign In</h2>

                <Row className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center form-group mt-3">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </Row>
                <Row className="d-flex justify-content-center">
                  <div className="form-group mt-3 d-flex justify-content-center">
                    <input
                      type="password"
                      id="pass"
                      name="password"
                      placeholder="Password"
                      minLength="8"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Row>
                <div className=" mt-3 d-flex justify-content-center">
                  <button
                    type="submit"
                    value="Sign in"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
