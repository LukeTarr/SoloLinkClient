import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import "./Login.css";
import toast, { Toaster } from "react-hot-toast";

type loginDto = {
  Error?: string;
  Token?: string;
  title?: string;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mut = useMutation("auth", sendLoginRequest, {
    retry: false,
    onSettled: (res) => {
      // Custom Error
      if (res?.Error) {
        toast.error(res.Error);
        return;
      }
      // Generic Server Error
      if (res?.title) {
        toast.error(res.title);
        return;
      }
      // Success
      if (res?.Token) {
        toast.success("Logged in!");
        return;
      }

      toast.error("Unknown Error");
    },
  });

  async function sendLoginRequest(): Promise<loginDto> {
    const requestBody = {
      email: email,
      password: password,
    };

    let res;

    try {
      res = await fetch(`${import.meta.env.VITE_SOLOLINK_API}/Auth/Login`, {
        body: JSON.stringify(requestBody),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {
      return { title: "Server Error" };
    }

    return await res.json();
  }

  return (
    <div className="loginContainer">
      <Toaster />
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
              mut.mutateAsync();
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
