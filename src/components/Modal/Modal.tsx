import { Dispatch, SetStateAction, useState } from "react";
import { isHtmlElement } from "react-router-dom/dist/dom";
import { CategoryDTO, LinkDTO } from "../../data/contentDTOs";

type ModalProps = {
  action: "edit" | "delete" | "add";
  item: CategoryDTO | LinkDTO;
  invisible: boolean;
  setInvisible: Dispatch<SetStateAction<boolean>>;
};

const Modal = (props: ModalProps) => {
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
        <div>
          <h1>Edit</h1>
        </div>
      );
    } else if (props.action === "delete") {
      return (
        <div>
          <p>Are you sure you want to delete this item ({props.item.title})?</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Add</h1>
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
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
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
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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

export default Modal;
