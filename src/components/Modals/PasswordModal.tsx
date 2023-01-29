import {useState} from "react";
import {useMutation} from "react-query";
import {useRecoilState} from "recoil";
import MessageDTO from "../../data/MessageDTO";
import {tokenAtom} from "../../stateAtoms";

type PasswordModalProps = {
    hideSelf: () => void;
};

const CategoryModal = (props: PasswordModalProps) => {
    const [token, setToken] = useRecoilState(tokenAtom);
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    // React Queries

    const editPasswordMutation = useMutation("editCategory", editPassword, {
        onSettled: (res) => {
            // Custom Error
            if (res?.error) {
                setError(res.error);
                return;
            }

            if (res?.message) {
                props.hideSelf();
            }
        },
    });

    async function editPassword(): Promise<MessageDTO> {
        let res;
        try {
            res = await fetch(
                `${import.meta.env.VITE_SOLOLINK_API}/Auth/ChangePassword`,
                {
                    method: "PUT",
                    body: JSON.stringify({password, repeatPassword, currentPassword}),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch {
            return {error: "Server Error"};
        }

        return await res.json();
    }

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            id="interestModal"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                ></span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start flex items-center justify-center">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900 text-center"
                                    id="modal-title"
                                >
                                    Edit Password
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm text-gray-500">
                                        <div className="flex flex-col mb-8 items-center justify-center">
                                            <label htmlFor="email" className="text-xl my-2">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={(e) => {
                                                    setCurrentPassword(e.target.value);
                                                }}
                                                className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                                            />

                                            <label htmlFor="email" className="text-xl my-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                                            />

                                            <label htmlFor="email" className="text-xl my-2">
                                                Password Repeat
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={(e) => {
                                                    setRepeatPassword(e.target.value);
                                                }}
                                                className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <div className="mt-2">
                                        <div className="text-sm text-red-400">{error}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex items-center justify-center">
                        <button
                            id="login"
                            className="mx-4 w-24 h-10 rounded bg-slate-400 hover:bg-slate-300"
                            onClick={() => {
                                props.hideSelf();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            id="login"
                            className="mx-4 w-24 h-10 rounded bg-green-500 hover:bg-green-400"
                            onClick={() => {
                                editPasswordMutation.mutateAsync();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
