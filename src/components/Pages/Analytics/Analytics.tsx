import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import AnalyticsDTO from "../../../data/pageViewDTO";
import { tokenAtom } from "../../../stateAtoms";

const Analytics = () => {
  const [content, setContent] = useState({} as AnalyticsDTO);
  const [error, setError] = useState("");
  const token = useRecoilValue(tokenAtom);

  const contentQuery = useQuery("content", getAnalytics, {
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

  async function getAnalytics(): Promise<AnalyticsDTO> {
    let res;
    try {
      res = await fetch(
        `${import.meta.env.VITE_SOLOLINK_API}/PageView/GetMyPageViews`,
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
      <div className="flex flex-col items-center justify-center w-4/5 bg-gray-400 p-4 rounded-3xl shadow-2xl">
        {content.username ? (
          <>
            <h2 className="text-3xl mb-10">{content.username}'s Analytics</h2>
            <div className="w-full"></div>
            <div>
              <h2 className="text-center mb-10 text-2xl">Weekly Report</h2>
            </div>
            {/* TODO: Generate Bar Graph: x-axis as day, y-axis as views for that day */}
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

export default Analytics;
