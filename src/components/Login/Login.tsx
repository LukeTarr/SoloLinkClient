import { copyFileSync } from "fs";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = () => {
    const requestBody = {
      email: email,
      password: password,
    };

    fetch(`http://localhost:5111/Auth/Login`, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    });
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1>Login</h1>

        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="btnContainer">
          <Link to="/Register">
            <button id="register">REGISTER</button>
          </Link>
          <button
            id="login"
            onClick={() => {
              sendLoginRequest();
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
