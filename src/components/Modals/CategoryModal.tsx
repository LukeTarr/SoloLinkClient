import {useState} from "react";
import {useMutation} from "react-query";
import {useRecoilValue} from "recoil";
import {CategoryDTO, ContentDTO} from "../../data/contentDTOs";
import MessageDTO from "../../data/messageDTO";
import {tokenAtom} from "../../stateAtoms";

type CategoryModalProps = {
    action: "edit" | "delete" | "add";
    Category: CategoryDTO;
    hideSelf: () => void;
    content: ContentDTO;
};

const CategoryModal = (props: CategoryModalProps) => {
    const [title, setTitle] = useState(props.Category.title);
    const [error, setError] = useState("");
    const token = useRecoilValue(tokenAtom);

    // React Queries

    const deleteCategoryMutation = useMutation("deleteCategory", deleteCategory, {
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

    const editCategoryMutation = useMutation("editCategory", editCategory, {
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

    const addCategoryMutation = useMutation("addCategory", addCategory, {
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

    // Create, Update, Delete requests for Category

    async function deleteCategory(): Promise<MessageDTO> {
        let res;
        try {
            res = await fetch(
                `${import.meta.env.VITE_SOLOLINK_API}/Category/${
                    props.Category.categoryId
                }`,
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

    async function editCategory(): Promise<MessageDTO> {
        let res;
        try {
            res = await fetch(
                `${import.meta.env.VITE_SOLOLINK_API}/Category/${
                    props.Category.categoryId
                }`,
                {
                    method: "PUT",
                    body: JSON.stringify({title}),
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

    async function addCategory(): Promise<MessageDTO> {
        let res;
        try {
            res = await fetch(`${import.meta.env.VITE_SOLOLINK_API}/Category`, {
                method: "POST",
                body: JSON.stringify({title}),
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
            return "Edit Category";
        } else if (props.action === "delete") {
            return "Delete Category";
        } else {
            return "Add Category";
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
                        defaultValue={props.Category.title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className="text-black bg-white my-4 w-full h-8 rounded text-center border-2 border-black"
                    />
                </div>
            );
        }
        return (
            <div>
                <p>
                    Are you sure you want to delete this category ({props.Category.title}
                    )?
                </p>
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
                                    deleteCategoryMutation.mutateAsync();
                                } else if (props.action === "edit") {
                                    editCategoryMutation.mutateAsync();
                                } else {
                                    addCategoryMutation.mutateAsync();
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

export default CategoryModal;
