import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ContentDTO from "../../../data/contentDTO";

const Profile = () => {
  const { username } = useParams();
  const [content, setContent] = useState({} as ContentDTO);
  const [error, setError] = useState("");
  const query = useQuery("content", getContent, {
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

  async function getContent(): Promise<ContentDTO> {
    let res;
    try {
      res = await fetch(
        `${import.meta.env.VITE_SOLOLINK_API}/Profile/GetContent/${username}`,
        {
          method: "GET",
        }
      );
    } catch {
      return { title: "Server Error" };
    }

    return await res.json();
  }

  return (
    <div className="flex items-center justify-center mt-20">
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
                          <div className="bg-blue-500 hover:bg-blue-300 text-white rounded-3xl mt-10 h-8 w-1/4 text-center shadow-lg">
                            <a href={l.url}>
                              <h1>{l.title}</h1>
                            </a>
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

export default Profile;
