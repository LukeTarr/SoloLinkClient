import {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import RegisterDTO from "../../../data/RegisterDTO";
import MainCard from "../../MainCard/MainCard";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const navigate = useNavigate();

    const mut = useMutation("register", sendLoginRequest, {
        retry: false,
        onSettled: (res) => {
            // Custom Error
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            // Generic Server Error
            if (res?.title) {
                toast.error(res.title);
                return;
            }
            // Success
            if (res?.message) {
                navigate("/Login");
                return;
            }

            toast.error("Unknown Error");
        },
    });

    async function sendLoginRequest(): Promise<RegisterDTO> {
        if (!email) {
            return {title: "Email is required"};
        }

        if (!username) {
            return {title: "Email is required"};
        }

        if (!password) {
            return {title: "Password is required"};
        }

        if (!passwordRepeat) {
            return {title: "Password is required"};
        }

        const requestBody = {
            email: email,
            username: username,
            password: password,
            repeatPassword: passwordRepeat,
        };

        let res;

        try {
            res = await fetch(`${import.meta.env.VITE_SOLOLINK_API}/Auth/Register`, {
                body: JSON.stringify(requestBody),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch {
            return {title: "Server Error"};
        }

        return await res.json();
    }

    return (
        <div className="flex justify-center items-center">
            <Toaster/>
            <MainCard>
                <h1 className="text-3xl mb-8">Register</h1>
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
                    <label htmlFor="username" className="text-xl my-2">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
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
                    <label htmlFor="passwordRepeat" className="text-xl my-2">
                        Repeat Password
                    </label>
                    <input
                        type="password"
                        name="passwordRepeat"
                        id="passwordRepeat"
                        onChange={(e) => {
                            setPasswordRepeat(e.target.value);
                        }}
                        className="text-black bg-white my-4 w-ful h-8 rounded text-center"
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
                        Register →
                    </button>
                </div>
            </MainCard>
        </div>
    );
};

export default Register;
