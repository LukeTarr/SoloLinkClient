import { useState } from "react";
import { CgPen, CgTrash } from "react-icons/cg";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { CategoryDTO, ContentDTO, LinkDTO } from "../../../data/contentDTOs";
import { tokenAtom } from "../../../stateAtoms";
import Modal from "../../Modal/Modal";

const Studio = () => {
  const token = useRecoilValue(tokenAtom);
  const [content, setContent] = useState({} as ContentDTO);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState({} as LinkDTO | CategoryDTO);
  const [selectedAction, setSelectedAction] = useState(
    "" as "edit" | "delete" | "add"
  );
  const [hideModal, setHideModal] = useState(true);

  const query = useQuery("myContent", getMyContent, {
    refetchOnWindowFocus: false,
    onSettled: (res) => {
      // Custom Error
      if (res?.Error) {
        setError(res.Error);
        return;
      }
      // Generic Server Error
      if (res?.title) {
        setError(res.title);
        return;
      }
      // Success
      if (res?.username) {
        setContent(res);
        return;
      }
    },
  });

  async function getMyContent(): Promise<ContentDTO> {
    let res;
    try {
      res = await fetch(
        `${import.meta.env.VITE_SOLOLINK_API}/Profile/GetMyContent`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch {
      return { title: "Server Error" };
    }

    return await res.json();
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Modal
        action={selectedAction}
        item={selectedItem}
        invisible={hideModal}
        setInvisible={setHideModal}
      />
      <div className="flex flex-col items-center justify-center w-4/5 bg-gray-400 p-4 rounded-3xl shadow-2xl">
        {content.username ? (
          <>
            <h2 className="text-3xl">{content.username}'s Profile</h2>
            <div className="w-full">
              {content.categoryDtos?.map((category, i) => {
                return (
                  <div className="w-full flex flex-col items-center justify-center">
                    <h1 className="text-3xl underline mt-10">
                      {category.title}
                    </h1>
                    {content.linkDtos?.map((l) => {
                      if (l.categoryId === category.categoryId) {
                        return (
                          <div className="mt-10 h-8 w-full md:w-1/2 text-center flex justify-between">
                            <a
                              href={l.url}
                              className="bg-blue-500 hover:bg-blue-300 text-white rounded-3xl w-full"
                            >
                              <h1 key={l.linkId}>{l.title}</h1>
                            </a>
                            <CgTrash
                              className="w-12 h-8 hover:cursor-pointer"
                              onClick={() => {
                                setSelectedItem(l);
                                setSelectedAction("delete");
                                setHideModal(false);
                              }}
                            />
                            <CgPen
                              className="w-12 h-8 hover:cursor-pointer"
                              onClick={() => {
                                setSelectedItem(l);
                                setSelectedAction("edit");
                                setHideModal(false);
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl">{error}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Studio;
