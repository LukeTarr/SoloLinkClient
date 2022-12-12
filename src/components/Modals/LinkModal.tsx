import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { LinkDTO, ContentDTO } from "../../data/contentDTOs";
import MessageDTO from "../../data/messageDTO";
import { tokenAtom } from "../../stateAtoms";

type LinkModalProps = {
  action: "edit" | "delete" | "add";
  link: LinkDTO;
  invisible: boolean;
  setInvisible: Dispatch<SetStateAction<boolean>>;
  content: ContentDTO;
};

const LinkModal = (props: LinkModalProps) => {
  const [categoryId, setCategoryId] = useState(-1);
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState(props.link);
  const token = useRecoilValue(tokenAtom);

  // React Queries

  const query = useMutation("deleteLink", deleteLink, {
    onSettled: (res) => {
      // Custom Error
      if (res?.Error) {
        setError(res.Error);
        return;
      }

      if (res?.Message && res.Message === "Success") {
        return;
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
      return { Message: "Server Error" };
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
    if (props.action === "edit") {
      return (
        <div className="flex flex-col mb-8 items-center justify-center">
          <label htmlFor="email" className="text-xl my-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={origin.title}
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
            defaultValue={origin.url}
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
            defaultValue={
              props.content.categoryDtos?.at(origin.categoryId)?.title
            }
            onChange={(e) => {
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
    } else if (props.action === "delete") {
      return (
        <div>
          <p>Are you sure you want to delete this item ({props.link.title})?</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Are you sure you want to edit this item ({props.link.title})?</p>
        </div>
      );
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        props.invisible && "invisible"
      }`}
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex items-center justify-center">
            <button
              id="login"
              className="mx-4 w-24 h-10 rounded bg-slate-400 hover:bg-slate-300"
              onClick={() => {
                props.setInvisible(true);
              }}
            >
              Cancel
            </button>
            <button
              id="login"
              className="mx-4 w-24 h-10 rounded bg-green-500 hover:bg-green-400"
              onClick={() => {
                props.setInvisible(true);
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
