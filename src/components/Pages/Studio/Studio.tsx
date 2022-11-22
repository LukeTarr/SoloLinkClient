import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import ContentDTO from "../../../data/contentDTO";
import { tokenAtom } from "../../../stateAtoms";

const Studio = () => {
  const token = useRecoilValue(tokenAtom);
  const [content, setContent] = useState({} as ContentDTO);
  const [error, setError] = useState("");
  const query = useQuery("myContent", getMyContent, {
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
      <div className="flex flex-col items-center justify-center w-4/5 bg-gray-400 p-4 shadow-2xl">
        {content.username ? (
          <>
            <h2 className="text-3xl">{content.username}'s Studio</h2>
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
