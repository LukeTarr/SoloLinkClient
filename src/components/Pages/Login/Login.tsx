import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import LoginDto from "../../../data/LoginDTO";
import { tokenAtom } from "../../../stateAtoms";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useRecoilState(tokenAtom);
  const navigate = useNavigate();

  const mut = useMutation("login", sendLoginRequest, {
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

  async function sendLoginRequest(): Promise<LoginDto> {
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
    <div className="flex flex-col justify-center items-center">
      <Toaster />
      <div className="flex flex-col justify-center items-center m-20 mb-10 p-16 bg-gray-400 rounded-3xl text-center w-full md:w-1/2 shadow-2xl">
        <h1 className="text-3xl mb-8">Login</h1>
        <div className="flex flex-col mb-8 items-center justify-center">
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
            className="text-black bg-white my-4 w-full h-8 rounded text-center"
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
            className="text-black bg-white my-4 w-full h-8 rounded text-center"
          />
        </div>

        <div className="flex flex-nowrap items-center h-12 mt-1 justify-evenly">
          <button
            id="login"
            className="mx-4 w-40 h-10 rounded bg-green-500 hover:bg-green-400"
            onClick={() => {
              mut.mutateAsync();
            }}
          >
            LOGIN →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
