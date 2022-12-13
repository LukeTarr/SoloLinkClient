import { useEffect, useState } from "react";
import { CgPen, CgTrash } from "react-icons/cg";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { CategoryDTO, ContentDTO, LinkDTO } from "../../../data/contentDTOs";
import { tokenAtom } from "../../../stateAtoms";
import CategoryModal from "../../Modals/CategoryModal";
import LinkModal from "../../Modals/LinkModal";

const Studio = () => {
  const token = useRecoilValue(tokenAtom);
  const [content, setContent] = useState({} as ContentDTO);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState({} as LinkDTO | CategoryDTO);
  const [selectedAction, setSelectedAction] = useState(
    "" as "edit" | "delete" | "add"
  );
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    if (!showLinkModal && !showCategoryModal) {
      query.refetch();
    }
  }, [showLinkModal, showCategoryModal]);

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
      {showLinkModal && (
        <LinkModal
          action={selectedAction}
          link={selectedItem as LinkDTO}
          hideSelf={() => {
            setShowLinkModal(false);
          }}
          content={content}
        />
      )}

      {showCategoryModal && (
        <CategoryModal
          action={selectedAction}
          Category={selectedItem as CategoryDTO}
          hideSelf={() => {
            setShowCategoryModal(false);
          }}
          content={content}
        />
      )}
      <div className="flex flex-col items-center justify-center w-4/5 bg-gray-400 p-4 rounded-3xl shadow-2xl">
        {content.username ? (
          <>
            <h2 className="text-3xl">{content.username}'s Studio</h2>
            <div className="w-full">
              {content.categoryDtos?.map((c, i) => {
                return (
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className="flex flex-row mt-4">
                      <h1 className="text-3xl underline mt-10">{c.title}</h1>
                      <CgTrash
                        className="w-12 h-8 hover:cursor-pointer mt-10"
                        onClick={() => {
                          setSelectedItem(c);
                          setSelectedAction("delete");
                          setShowCategoryModal(true);
                        }}
                      />
                      <CgPen
                        className="w-12 h-8 hover:cursor-pointer mt-10"
                        onClick={() => {
                          setSelectedItem(c);
                          setSelectedAction("edit");
                          setShowCategoryModal(true);
                        }}
                      />
                    </div>

                    {content.linkDtos?.map((l) => {
                      if (l.categoryId === c.categoryId) {
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
                                setShowLinkModal(true);
                              }}
                            />
                            <CgPen
                              className="w-12 h-8 hover:cursor-pointer"
                              onClick={() => {
                                setSelectedItem(l);
                                setSelectedAction("edit");
                                setShowLinkModal(true);
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
              <div className="w-full flex flex-row justify-center items-center">
                <button
                  id="login"
                  className="mx-4 mt-20 w-40 h-10 rounded bg-green-500 hover:bg-green-400"
                  onClick={() => {
                    setSelectedItem({
                      title: "Example Title",
                      url: "Example URL",
                    } as LinkDTO);
                    setSelectedAction("add");
                    setShowLinkModal(true);
                  }}
                >
                  + Link
                </button>
                <button
                  id="login"
                  className="mx-4 mt-20 w-40 h-10 rounded bg-green-500 hover:bg-green-400"
                  onClick={() => {
                    setSelectedItem({
                      title: "Example Title",
                    } as CategoryDTO);
                    setSelectedAction("add");
                    setShowCategoryModal(true);
                  }}
                >
                  + Category
                </button>
              </div>
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
