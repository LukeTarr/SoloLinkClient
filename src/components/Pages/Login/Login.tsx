import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import "../../../index.css";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../../stateAtoms";

type loginDto = {
  Error?: string;
  Token?: string;
  title?: string;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useRecoilState(tokenAtom);
  const navigate = useNavigate();

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
        setToken(res.Token);
        toast.success("Logged in!");
        navigate("/Dashboard");
        return;
      }

      toast.error("Unknown Error");
    },
  });

  async function sendLoginRequest(): Promise<loginDto> {
    if (!email) {
      return { title: "Email is required" };
    }

    if (!password) {
      return { title: "Password is required" };
    }
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
    <div className="flex flex-shrink justify-center items-center">
      <Toaster />
      <div className="card">
        <h1 className="text-3xl mb-8">Login</h1>
        <div className="flex flex-col mb-8">
          <label htmlFor="email" className="text-xl my-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="text-black bg-white my-4 w-60 h-8 rounded text-center"
          />
          <label htmlFor="password" className="text-xl my-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-black bg-white my-4 w-60 h-8 rounded text-center"
          />
        </div>

        <div className="flex flex-nowrap items-center h-12 mt-1 justify-evenly">
          <Link to="/Register">
            <button
              id="register"
              className="mx-4 w-40 h-10 rounded font-extrabold  bg-blue-500 hover:bg-blue-400"
            >
              REGISTER
            </button>
          </Link>
          <button
            id="login"
            className="mx-4 w-40 h-10 rounded font-extrabold bg-green-500 hover:bg-green-400"
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
