import {useState} from "react";
import {useMutation} from "react-query";
import {useRecoilValue} from "recoil";
import {ContentDTO, LinkDTO} from "../../data/contentDTOs";
import MessageDTO from "../../data/messageDTO";
import {tokenAtom} from "../../stateAtoms";

type LinkModalProps = {
    action: "edit" | "delete" | "add";
    link: LinkDTO;
    hideSelf: () => void;
    content: ContentDTO;
};

const LinkModal = (props: LinkModalProps) => {
    const [categoryId, setCategoryId] = useState(
        props.content.categoryDtos?.at(0)?.categoryId
    );
    const [title, setTitle] = useState(props.link.title);
    const [url, setURL] = useState(props.link.url);
    const [error, setError] = useState("");
    const token = useRecoilValue(tokenAtom);

    // React Queries

    const deleteLinkMutation = useMutation("deleteLink", deleteLink, {
        onSettled: (res) => {
            // Custom Error
            if (res?.Error) {
                setError(res.Error);
                return;
            }

            if (res?.Message && res.Message === "Success") {
                props.hideSelf();
            }
        },
    });

    const editLinkMutation = useMutation("editLink", editLink, {
        onSettled: (res) => {
            // Custom Error
            if (res?.Error) {
                setError(res.Error);
                return;
            }

            if (res?.Message && res.Message === "Success") {
                props.hideSelf();
            }
        },
    });

    const addLinkMutation = useMutation("addLink", addLink, {
        onSettled: (res) => {
            // Custom Error
            if (res?.Error) {
                setError(res.Error);
                return;
            }

            if (res?.Message && res.Message === "Success") {
                props.hideSelf();
            }
        },
    });

    // Create, Update, Delete requests for Link

    async function deleteLink(): Promise<MessageDTO> {
        let res;
        try {
            res = await fetch(
                `${import.meta.env.VITE_SOLOLINK_API}/Link/${props.link.linkId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch {
            return {Message: "Server Error"};
        }

        return await res.json();
    }

    async function editLink(): Promise<MessageDTO> {
        let res;
        console.log(JSON.stringify({categoryId, title, url}));
        try {
            res = await fetch(
                `${import.meta.env.VITE_SOLOLINK_API}/Link/${props.link.linkId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({categoryId, title, url}),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch {
            return {Message: "Server Error"};
        }

        return await res.json();
    }

    async function addLink(): Promise<MessageDTO> {
        let res;
        console.log(JSON.stringify({categoryId, title, url}));
        try {
            res = await fetch(`${import.meta.env.VITE_SOLOLINK_API}/Link`, {
                method: "POST",
                body: JSON.stringify({categoryId, title, url}),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        } catch {
            return {Message: "Server Error"};
        }

        return await res.json();
    }

    // Condtional content functions
    const getTitle = () => {
        if (props.action === "edit") {
            return "Edit Item";
        } else if (props.action === "delete") {
            return "Delete Item";
        } else {
            return "Add Item";
        }
    };

    const getBody = () => {
        if (props.action === "edit" || props.action === "add") {
            return (
                <div className="flex flex-col mb-8 items-center justify-center">
                    <label htmlFor="email" className="text-xl my-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={props.link.title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                    />
                    <label htmlFor="password" className="text-xl my-2">
                        URL
                    </label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        defaultValue={props.link.url}
                        onChange={(e) => {
                            setURL(e.target.value);
                        }}
                        className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                    />
                    <label htmlFor="password" className="text-xl my-2">
                        Category
                    </label>
                    <select
                        name="url"
                        id="url"
                        defaultValue={props.content.categoryDtos?.at(0)?.categoryId}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setCategoryId(parseInt(e.target.value));
                        }}
                        className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                    >
                        {props.content.categoryDtos?.map((c, i) => {
                            return <option value={c.categoryId}>{c.title}</option>;
                        })}
                    </select>
                </div>
            );
        }
        return (
            <div>
                <p>Are you sure you want to delete this link ({props.link.title})?</p>
            </div>
        );
    };

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
                                    {getTitle()}
                                </h3>
                                <div className="mt-2">
                                    <div className="text-sm text-gray-500">{getBody()}</div>
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
                                if (props.action === "delete") {
                                    deleteLinkMutation.mutateAsync();
                                } else if (props.action === "edit") {
                                    editLinkMutation.mutateAsync();
                                } else {
                                    addLinkMutation.mutateAsync();
                                }
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

export default LinkModal;
